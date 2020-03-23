const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const CommandError = require('../../utils/CommandError')

const query = fs.readFileSync(path.resolve(__dirname, './query.gql'))

module.exports = async (message, args) => {
  const name = args[0]
  const alias = args[1]

  try {
    await graphqlClient.request(query, { name, alias })
    message.channel.send(`Added command ${alias} to ${name}`)
  } catch (error) {
    console.error(error)
    throw new CommandError('Something went wrong when aliasing this meme')
  }
}
