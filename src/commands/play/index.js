const gql_client = require('../../client.js')
const CommandError = require('../../CommandError.js')
const http = require('http')

module.exports = {
  name: 'play',
  description: 'plays a meme on the currently joined voice channel',
  usage: '<command>',
  minArgs: 0,
  maxArgs: 0,
  async execute(message, command, client) {
    if (!message.member.voiceChannel) {
      throw new CommandError('You must join a voice channel to play memes')
    }

    const query = `query Meme($command: String!){
      meme(command: $command) {
        url,
        volume
      }
    }`

    try {
      if (
        client.voiceConnections != null &&
        client.voiceConnections.find(
          conn => conn.channel == message.member.voiceChannel
        )
      ) {
        throw new CommandError('Memebot is already playing a meme.')
      }

      const { meme } = await gql_client.request(query, { command })

      if (meme === null) {
        throw new CommandError('There are no memes named ' + command + '.')
      }

      const connection = await message.member.voiceChannel.join()

      http.get(process.env.MEMEBOT_API_BASE_URL + meme.url, res => {
        const dispatcher = connection.playStream(res)
        dispatcher.setVolumeLogarithmic(meme.volume)
        dispatcher.on('end', () => {
          connection.disconnect()
        })
      })
    } catch (error) {
      if (error instanceof CommandError) {
        throw error
      } else {
        console.error(error)
        throw new CommandError('Something went wrong when playing this meme')
      }
    }
  }
}
