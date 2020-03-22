const client = require('../client.js')
const CommandError = require('../CommandError.js')

module.exports = {
  name: 'list',
  description: 'list all memes',
  usage: 'list',
  minArgs: 0,
  maxArgs: 2,
  async execute(message, args) {
    const listType = args.length ? args.shift() : 'alpha'
    const listModifier = args.length ? args.shift() : ''

    let listCommands = {
      newest: message => listMemes(message, SortTypes.NEWEST, { count: 50 }),
      new: message => listMemes(message, SortTypes.NEWEST, { count: 50 }),
      // set old and oldest to 148 because those are the ones without dates
      oldest: message => listMemes(message, SortTypes.OLDEST, { count: 148 }),
      old: message => listMemes(message, SortTypes.OLDEST, { count: 148 }),
      alpha: message => listMemes(message, SortTypes.ALPHABETIC),
      tags: message => listTags(message),
      tag: message =>
        listMemes(message, SortTypes.NEWEST, { tag: listModifier })
    }

    try {
      // if there is not a command for it then just assume its a tag
      if (listCommands[listType]) {
        listCommands[listType](message)
      } else {
        listMemes(message, SortTypes.NEWEST, { tag: listType })
      }
    } catch (error) {
      console.error(error)
      throw new CommandError('Something went wrong when listing memes')
    }
  }
}

const SortTypes = Object.freeze({
  NEWEST: 'newest',
  OLDEST: 'oldest',
  ALPHABETIC: 'alphabetic',
  MOST_PLAYED: 'mostPlayed',
  LEAST_PLAYED: 'leastPlayed'
})

async function listMemes(message, sortType, options) {
  const query = `{
      memes {
        name
        createdAt
        tags
      }
    }`

  let { memes } = await client.request(query)

  if (options && options.tag) {
    memes = memes.filter(meme => meme.tags.includes(options.tag))
  }

  switch (sortType) {
    case SortTypes.NEWEST:
      memes.sort((x, y) => y.createdAt.localeCompare(x.createdAt))
      break
    case SortTypes.OLDEST:
      memes.sort((x, y) => x.createdAt.localeCompare(y.createdAt))
      break
    case SortTypes.ALPHABETIC:
      memes.sort((x, y) => x.name.localeCompare(y.name))
      break
    default:
      memes.sort((x, y) => x.name.localeCompare(y.name))
      break
  }

  if (options && options.count) {
    memes = memes.slice(0, options.count)
  }

  if (memes.length == 0) {
    message.channel.send('No memes found')
  } else {
    message.channel.send(
      JSON.stringify(memes.map(meme => meme.name), null, ''),
      {
        split: { char: ',', prepend: ' ' },
        code: true
      }
    )
  }
}

async function listTags(message) {
  const query = `{
    tags
  }`

  let { tags } = await client.request(query)
  tags.sort()

  message.channel.send(JSON.stringify(tags, null, ''), {
    split: { char: ',', prepend: ' ' },
    code: true
  })
}
