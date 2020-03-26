const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const handleServerError = require('../../utils/handleServerError.js')

const query = fs.readFileSync(
  path.resolve(__dirname, './delete-meme.gql'),
  'utf8'
)

module.exports = async (message, args) => {
  try {
    const name = args[0]

    await graphqlClient.request(query, { name })
    message.channel.send(`Deleted ${name}`)
  } catch (error) {
    handleServerError(error)
  }
}
