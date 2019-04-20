const validator = require('validator')

module.exports = {
	name: 'add',
	description: 'creates a meme from a youtube link',
	usage: 'add <url> <start> <end> <name> [aliases...]',
	minArgs: 4,
	execute(message, args) {

		const data = {}

		// Parse url
		const hostWhitelist = [
			'www.youtube.com',
			'youtube.com',
			'youtu.be'
		]

		if (!validator.isURL(args[0], { host_whitelist: hostWhitelist })) {
			return message.channel.send('the URL must be a youtube link')
		}

		data.url = args[0]

		// Parse start and end
		const longPattern = /^-?(\d{1,2}:)?[0-5]?\d:[0-5]\d(.\d+)?$/
		const shortPattern = /^-?\d+(.\d+)?$/

		const invalidTimes = []

		if (!validator.matches(args[1], longPattern) &&
				!validator.matches(args[1], shortPattern)) {
			invalidTimes.push('start')
		}

		if (!validator.matches(args[2], longPattern) &&
				!validator.matches(args[2], shortPattern)) {
			invalidTimes.push('end')
		}

		if (invalidTimes.length > 0) {
			return message.channel.send(`the ${ invalidTimes.join(' and ') } time must match \`[-][HH:]MM:SS[.m...]\` or \`[-]S+[.m...]\``)
		}

		data.start = args[1]
		data.end = args[2]

		// Parse name and aliases
		data.name = args[3]
		data.aliases = []

		for (let i = 4; i < args.length; i++) {
			data.aliases.push(args[i])
		}
	}
}
