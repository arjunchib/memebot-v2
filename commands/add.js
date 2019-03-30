module.exports = {
	name: 'add',
	description: 'Downloads audio from youtube and creates a meme',
	execute(message, args) {
		console.log(args)
		message.channel.send('Pong.')
	}
}
