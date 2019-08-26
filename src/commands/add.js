const validator = require('validator')
const client = require('../client.js')
const CommandError = require('../CommandError.js')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

function getURL(args) {
  const hostWhitelist = ['www.youtube.com', 'youtube.com', 'youtu.be']

  if (
    !validator.isURL(args[0], { host_whitelist: hostWhitelist }) &&
    ytdl.validateURL(args[0])
  ) {
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

function downloadFile(data) {
  const stream = ytdl(data.url, { filter: 'audio' })
  const outputFile = path.resolve('.cache', 'audio', `${data.name}.mp3`)
  ffmpeg(stream)
    .noVideo()
    .seekOutput(data.start)
    .format('mp3')
    .outputOptions(['-write_xing 0', `-to ${data.end}`])
    .on('end', () => {
      console.log('Saved file!')
    })
    .on('error', () => {
      throw new CommandError('something went wrong when downloading your meme')
    })
    .save(outputFile)
}

module.exports = {
  name: 'add',
  description: 'creates a meme from a youtube link',
  usage: 'add <url> <start> <end> <name> [aliases...]',
  minArgs: 4,
  execute(message, args) {
    // parse args
    const data = {}
    data.url = getURL(args)
    Object.assign(data, getTimes(args))
    data.name = args[3]
    data.aliases = getAliases(args)
    data.author = {
      id: message.member.id,
      name: message.member.displayName
    }

    const outputFile = path.resolve('.cache', 'audio', `${data.name}.mp3`)

    const query = `mutation {
      createMeme(name: "${data.name}", author: {id:"${
      data.author.id
    }", name: "${data.author.name}"}, url: "${outputFile}") {
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

    client.request(query).then(data => console.log(data))

    // download file
    downloadFile(data)
  }
}
