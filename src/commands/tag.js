const client = require('../client.js')
const CommandError = require('../CommandError.js')

module.exports = {
  name: 'tag',
  description: 'adds a tag to a meme',
  usage: 'tag <name> <tag>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const tag = args[1]

    const query = `mutation AddTagToMeme($name: String!, $tag: String!){
      addTagToMeme(name: $name, tag: $tag) {
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
      message.channel.send(`Added tag ${tag} to ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when tagging this meme')
    }
  }
}
