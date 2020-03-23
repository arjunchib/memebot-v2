const graphqlClient = require('../../graphql-client')
const CommandError = require('../../utils/CommandError')

module.exports = {
  name: 'volume',
  description: 'sets the volume of a meme',
  usage: 'volume <name> <volume>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const volume = Number(args[1])

    if (!Number.isFinite(volume) || volume <= 0) {
      throw new CommandError(
        'Volume must be a non-zero, positive, finite number'
      )
    }

    const query = `mutation UpdateVolumeOfMeme($name: String!, $volume: Float!){
      updateVolumeOfMeme(name: $name, volume: $volume) {
        _id
        name
        author {
          id
          name
        }
        url
        commands
        tags
        volume
        createdAt
      }
    }`

    try {
      await graphqlClient.request(query, { name, volume })
      message.channel.send(`Set volume of ${name} to ${volume}`)
    } catch (error) {
      console.error(error)
      throw new CommandError(
        'Something went wrong when setting the volume of this meme'
      )
    }
  }
}
