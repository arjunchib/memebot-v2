const gqlClient = require('../../client.js')
const play = require('../play').execute

module.exports = {
  name: 'random',
  description: 'Play a random meme',
  usage: '',
  minargs: 0,
  maxargs: 1,

  async execute(message, args, client) {
    const allQuery = `{
      memes {
        name
        tags
      }
    }`
    let { memes } = await gqlClient.request(allQuery)

    if (args != null && args.length === 1) {
      memes = memes.filter(meme => meme.tags.includes(args[0]))
    }

    const chosenMeme = memes[Math.floor(Math.random() * memes.length)].name

    message.channel.send('Now playing ' + chosenMeme)

    play(message, chosenMeme, client)
  }
}
