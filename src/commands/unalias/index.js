const graphqlClient = require('../../graphql-client')
const CommandError = require('../../utils/CommandError')

module.exports = {
  name: 'unalias',
  description: 'remove an alias command from a meme',
  usage: 'unalias <name> <alias>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const alias = args[1]

    const query = `mutation RemoveAliasFromMeme($name: String!, $alias: String!){
      removeAliasFromMeme(name: $name, alias: $alias) {
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
      await graphqlClient.request(query, { name, alias })
      message.channel.send(`Removed command ${alias} from ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when untagging this meme')
    }
  }
}
