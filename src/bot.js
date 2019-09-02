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
  // Abort if wrong prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // Parse message
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/)
  const commandName = args.shift().toLowerCase()

  // Abort if not a command
  if (!client.commands.has(commandName)) return

  // Get command
  const command = client.commands.get(commandName)

  // Check arguement length
  const lowerCheck = !command.minArgs || args.length >= command.minArgs
  const upperCheck = !command.maxArgs || args.length <= command.maxArgs
  if (!lowerCheck || !upperCheck) {
    return message.channel.send(
      `wrong number of arguments
\`${command.usage}\``
    )
  }

  // Execute command
  command.execute(message, args).catch(error => {
    if (error.name === 'CommandError') {
      message.channel.send(error.message)
    } else {
      console.error(error)
      message.channel.send('there was an error trying to execute that command')
    }
  })
})

client.login(process.env.DISCORD_TOKEN)
