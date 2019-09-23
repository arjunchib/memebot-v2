const client = require('../client.js')
const CommandError = require('../CommandError.js')
const { codeBlockify } = require('../utils.js')

module.exports = {
  name: 'list',
  description: 'list all memes',
  usage: 'list',
  minArgs: 0,
  async execute(message) {
    const query = `{
      memes {
        name
      }
    }`

    try {
      const { memes } = await client.request(query)
      const list = memes.map(meme => meme.name)
      message.channel.send(codeBlockify(JSON.stringify(list, null, 2)))
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when listing memes')
    }
  }
}
