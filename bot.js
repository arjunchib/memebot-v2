const fs = require('fs')
const Discord = require('discord.js')
const sequelize = require('./sequelize.js')
const production = (process.env.NODE_ENV == 'production')

/* * * * * * * * * *
 *  SETUP CLIENT   *
 * * * * * * * * * */

// Get environment vars
const { prefix, token } = production
  ? require('./.config-prod.json')
  : require('./.config-dev.json')

// Start client
const client = new Discord.Client()

// Connect to database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

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
`wrong number of arguments
\`${ command.usage }\``
    )
  }

  // Execute command
	try {
    command.execute(message, args)
	} catch (err) {
    console.error(err)
    message.channel.send('there was an error trying to execute that command')
	}
})

client.login(token)
