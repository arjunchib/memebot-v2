const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const CommandError = require('../../utils/CommandError')
const getURL = require('./helpers/getURL')
const getTimes = require('./helpers/getTimes')
const getAliases = require('./helpers/getAliases')

const query = fs.readFileSync(path.resolve(__dirname, './query.gql'))

module.exports = async (message, args) => {
  const meme = {}
  meme.url = getURL(args)
  Object.assign(meme, getTimes(args))
  meme.name = args[3]
  meme.aliases = getAliases(args)
  meme.author = {
    id: message.member.id,
    name: message.member.displayName
  }

  try {
    await graphqlClient.request(query, {
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
    if (error.response.errors[0].message.includes('Duplicate')) {
      throw new CommandError('A meme with this name already exists')
    } else {
      throw new CommandError('Something went wrong when adding your meme')
    }
  }
}
