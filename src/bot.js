const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
require('dotenv').config()

/* * * * * * * * * *
 *  SETUP CLIENT   *
 * * * * * * * * * */

// Get environment vars
const prefix = process.env.COMMAND_PREFIX

// Setup file structure
function initDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
initDir(path.resolve('.cache'))
initDir(path.resolve('.cache', 'audio'))

// Start client
const client = new Discord.Client()

// Get commands
client.commands = new Discord.Collection()

const commandFiles = fs
  .readdirSync(path.resolve(__dirname, 'commands'))
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

/* * * * * * * * * *
 *  CLIENT EVENTS  *
 * * * * * * * * * */

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  // Abort if it is a message from another bot (incl. ourselves)
  if (message.author.bot) return

  // tokenize message
  const tokens = message.content
    .trim()
    .split(/ +/)

  // Abort if first token doesn't match the selected prefix
  // Special concern for old memebot prefix behavior (i.e. allow !meme with no space)
  if (prefix === '!' && tokens[0][0] === prefix) {
    tokens[0] = tokens[0].slice(1)
  } else if (tokens[0] !== prefix) {
    return
  } else {
    tokens.shift() // remove the prefix
  }

  const providedCommand = tokens.shift().toLowerCase()
  const args = tokens

  // Get command
  // Default behavior is for memebot to default to play a meme when the "command"
  // doesn't match a currently registered command (i.e. !prefix hi 
  const commandName = client.commands.has(providedCommand)
    ? providedCommand
    : 'play'
  const command = client.commands.get(commandName)

  // Check argument length
  const lowerCheck = !command.minArgs || args.length >= command.minArgs
  const upperCheck = !command.maxArgs || args.length <= command.maxArgs
  if (!lowerCheck || !upperCheck) {
    return message.channel.send(
      `wrong number of arguments
\`${command.usage}\``
    )
  }

  // Execute command
  let params = args
  if (commandName === 'help') {
    params = client.commands
  } else if (commandName === 'play') {
    params = providedCommand
  }
  command.execute(message, params).catch(error => {
    if (error.name === 'CommandError') {
      message.channel.send(error.message)
    } else {
      console.error(error)
      message.channel.send('there was an error trying to execute that command')
    }
  })
})

client.login(process.env.DISCORD_TOKEN)
