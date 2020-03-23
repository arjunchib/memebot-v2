const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const handleServerError = require('../../utils/handleServerError.js')

const query = fs.readFileSync(path.resolve(__dirname, './delete-meme.gql'))

module.exports = async (message, args) => {
  const name = args[0]

  try {
    await graphqlClient.request(query, { name })
    message.channel.send(`Deleted ${name}`)
  } catch (error) {
    handleServerError(error)
  }
}
