const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const CommandError = require('../../utils/CommandError')

const query = fs.readFileSync(path.resolve(__dirname, './query.gql'))

module.exports = async (message, args) => {
  const name = args[0]

  try {
    await graphqlClient.request(query, { name })
    message.channel.send(`Deleted ${name}`)
  } catch (error) {
    console.error(error)
    throw new CommandError('Something went wrong when deleting this meme')
  }
}
