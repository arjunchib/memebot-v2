const fs = require('fs')
const Discord = require('discord.js')
const production = (process.env.NODE_ENV == 'production')

/* * * * * * * * * *
 *  SETUP CLIENT   *
 * * * * * * * * * */

// Get environment vars
const { prefix, token } = production
  ? require('./.config.json')
  : require('./.config-dev.json')

// Start client
const client = new Discord.Client()

// Get commands
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

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
	const args = message.content.slice(prefix.length).split(/ +/)
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
`Wrong number of arguments.
\`${ command.usage }\``
    )
  }

  // Execute command
	try {
    command.execute(message, args)
	} catch (error) {
    console.error(error)
    message.channel.send('There was an error trying to execute that command!')
	}
})

client.login(token)
