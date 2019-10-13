const client = require('../client.js')
const CommandError = require('../CommandError.js')

module.exports = {
  name: 'alias',
  description: 'adds an alias command to a meme',
  usage: 'alias <name> <alias>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const alias = args[1]

    const query = `mutation AddAliasToMeme($name: String!, $alias: String!){
      addAliasToMeme(name: $name, alias: $alias) {
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
      await client.request(query, { name, alias })
      message.channel.send(`Added command ${alias} to ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when aliasing this meme')
    }
  }
}
