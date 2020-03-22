const client = require('../../client.js')
const CommandError = require('../../CommandError.js')

module.exports = {
  name: 'untag',
  description: 'remove a tag from a meme',
  usage: 'untag <name> <tag>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const tag = args[1]

    const query = `mutation RemoveTagFromMeme($name: String!, $tag: String!){
      removeTagFromMeme(name: $name, tag: $tag) {
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
      await client.request(query, { name, tag })
      message.channel.send(`Removed tag ${tag} from ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when untagging this meme')
    }
  }
}
