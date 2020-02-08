const gqlClient = require('../client.js')
const play = require('./play.js').execute

module.exports = {
  name: 'random',
  description: 'Play a random meme',
  usage: '',
  minargs: 0,
  maxargs: 1,

  async execute(message, args) {
    const all_query = `{
      memes {
        name
        tags
      }
    }`
    let { memes } = await gqlClient.request(all_query)

    if (args != null && args.length == 1) {
      memes = memes.filter(meme => meme.tags.includes(args[0]))
    }

    const chosenMeme = memes.map(meme => meme.name)[
      Math.floor(Math.random() * memes.length)
    ]

    play(message, chosenMeme)
  }
}
