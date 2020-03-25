const CommandError = require('../../utils/CommandError')
const fs = require('fs')
const graphqlClient = require('../../graphql-client')
const http = require('http')
const path = require('path')
const handleServerError = require('../../utils/handleServerError')
const { isAlreadyPlaying } = require('./helpers')

const query = fs.readFileSync(path.resolve(__dirname, './meme.gql'), 'utf8')

module.exports = async (message, command) => {
  try {
    if (!message.member.voice.channel) {
      throw new CommandError('You must join a voice channel to play memes')
    }

    if (isAlreadyPlaying(message)) {
      return
    }

    const { meme } = await graphqlClient.request(query, { command })

    if (meme === null) {
      throw new CommandError(`There are no memes named ${command}`)
    }

    const connection = await message.member.voice.channel.join()

    http.get(process.env.MEMEBOT_API_BASE_URL + meme.url, res => {
      const dispatcher = connection.play(res)
      dispatcher.setVolumeLogarithmic(meme.volume)
      dispatcher.on('end', () => {
        connection.disconnect()
      })
    })
  } catch (error) {
    handleServerError(error)
  }
}
