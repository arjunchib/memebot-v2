const client = require('../client.js')
const CommandError = require('../CommandError.js')

module.exports = {
  name: 'delete',
  description: 'removes a command',
  usage: 'delete <name>',
  minArgs: 1,
  maxArgs: 1,
  async execute(message, args) {
    const name = args[0]

    const query = `mutation DeleteMeme($name: String!){
      deleteMeme(name: $name) {
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
      await client.request(query, { name })
      message.channel.send(`Deleted ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when deleting this meme')
    }
  }
}
