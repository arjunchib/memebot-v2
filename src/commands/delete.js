const client = require('../client.js')
const CommandError = require('../CommandError.js')
const path = require('path')
const fs = require('mz/fs')

module.exports = {
  name: 'delete',
  description: 'removes a command',
  usage: 'delete <name>',
  minArgs: 1,
  async execute(message, args) {
    const name = args[0]
    console.log(name)

    const file = path.resolve('.cache', 'audio', `${name}.mp3`)

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
      await fs.unlink(file)
      message.channel.send(`Deleted ${name}`)
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when deleting this meme')
    }
  }
}
