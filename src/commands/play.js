const client = require('../client.js')
const CommandError = require('../CommandError.js')

module.exports = {
  name: 'play',
  description: 'plays a meme on the currently joined voice channel',
  usage: '<command>',
  minArgs: 0,
  maxArgs: 0,
  async execute(message, command) {
    if (!message.member.voiceChannel) {
      throw new CommandError('You must join a voice channel to play memes')
    }

    const query = `query Meme($command: String!){
      meme(command: $command) {
        url
      }
    }`

    try {
      const { meme } = await client.request(query, { command })
      const connection = await message.member.voiceChannel.join()
      const dispatcher = connection.playFile(meme.url)
      dispatcher.on('end', () => {
        connection.disconnect()
      })
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when playing this meme')
    }
  }
}
