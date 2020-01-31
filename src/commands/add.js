const client = require('../client.js')
const CommandError = require('../CommandError.js')

function getURL(args) {
  return args[0]
}

function getTimes(args) {
  return {
    start: args[1],
    end: args[2]
  }
}

function getAliases(args) {
  const aliases = []

  for (let i = 4; i < args.length; i++) {
    aliases.push(args[i])
  }

  return aliases
}

module.exports = {
  name: 'add',
  description: 'creates a meme from a youtube link',
  usage: 'add <url> <start> <end> <name> [aliases...]',
  minArgs: 4,
  async execute(message, args) {
    const meme = {}
    meme.url = getURL(args)
    Object.assign(meme, getTimes(args))
    meme.name = args[3]
    meme.aliases = getAliases(args)
    meme.author = {
      id: message.member.id,
      name: message.member.displayName
    }

    const query = `mutation CreateMeme($name: String!, $authorID: ID!, $authorName: String!, $url: String!, $start: String!, $end,: String!){
      createMeme(name: $name, author: {id: $authorID, name: $authorName}, url: $url, start: $start, end: $end) {
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
      await client.request(query, {
        name: meme.name,
        authorID: meme.author.id,
        authorName: meme.author.name,
        url: meme.url,
        start: meme.start,
        end: meme.end
      })
    } catch (error) {
      console.error(error)
      console.error(JSON.stringify(error, undefined, 2))
      if (error.response.errors[0].message.includes('E11000')) {
        throw new CommandError('A meme with this name already exists')
      } else {
        throw new CommandError('Something went wrong when adding your meme')
      }
    }
  }
}
