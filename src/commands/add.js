const validator = require('validator')
const client = require('../client.js')
const CommandError = require('../CommandError.js')

const hostWhitelist = ['www.youtube.com', 'youtube.com', 'youtu.be']

function getURL(args) {
  if (!validator.isURL(args[0], { host_whitelist: hostWhitelist })) {
    throw new CommandError('the URL must be a youtube link')
  }
  return args[0]
}

function getTimes(args) {
  const longPattern = /^-?(\d{1,2}:)?[0-5]?\d:[0-5]\d(.\d+)?$/
  const shortPattern = /^-?\d+(.\d+)?$/

  const invalidTimes = []

  if (
    !validator.matches(args[1], longPattern) &&
    !validator.matches(args[1], shortPattern)
  ) {
    invalidTimes.push('start')
  }

  if (
    !validator.matches(args[2], longPattern) &&
    !validator.matches(args[2], shortPattern)
  ) {
    invalidTimes.push('end')
  }

  if (invalidTimes.length > 0) {
    throw new CommandError(
      `the ${invalidTimes.join(
        ' and '
      )} time must match \`[-][HH:]MM:SS[.m...]\` or \`[-]S+[.m...]\``
    )
  }

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
  execute(message, args) {
    const data = {}
    data.url = getURL(args)
    Object.assign(data, getTimes(args))
    data.name = args[3]
    data.aliases = getAliases(args)

    /*
    const query = `{
      memes {
        name
        tags
        author {
          id
          name
        }
      }
    }`

    client.request(query).then(data => console.log(data))
    */
  }
}
