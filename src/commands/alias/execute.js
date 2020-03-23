const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const handleServerError = require('../../utils/handleServerError.js')

const query = fs.readFileSync(
  path.resolve(__dirname, './add-alias-to-meme.gql')
)

module.exports = async (message, args) => {
  const name = args[0]
  const alias = args[1]

  try {
    await graphqlClient.request(query, { name, alias })
    message.channel.send(`Added command ${alias} to ${name}`)
  } catch (error) {
    handleServerError(error)
  }
}
