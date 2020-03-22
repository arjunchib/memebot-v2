const fs = require('fs')
const path = require('path')
const client = require('../../client.js')
const CommandError = require('../../CommandError.js')

const query = fs.readFileSync(path.resolve(__dirname, './query.gql'))

module.exports = async (message, args) => {
  const name = args[0]

  try {
    await client.request(query, { name })
    message.channel.send(`Deleted ${name}`)
  } catch (error) {
    console.error(error)
    throw new CommandError('Something went wrong when deleting this meme')
  }
}
