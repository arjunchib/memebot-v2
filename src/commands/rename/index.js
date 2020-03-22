const client = require('../../client.js')
const CommandError = require('../../CommandError.js')

module.exports = {
  name: 'rename',
  description: 'renames a meme',
  usage: 'rename <name> <newName>',
  minArgs: 2,
  maxArgs: 2,
  async execute(message, args) {
    const name = args[0]
    const newName = args[1]

    const query = `mutation RenameMeme($name: String!, $newName: String!){
      renameMeme(oldName: $name, newName: $newName) {
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
      await client.request(query, { name, newName })
      message.channel.send(`Rename ${name} to ${newName}`)
    } catch (error) {
      error.response.errors.forEach(x => console.error(x))
      throw new CommandError('Something went wrong when renaming this meme')
    }
  }
}
