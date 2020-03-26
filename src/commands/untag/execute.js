const handleServerError = require('../../utils/handleServerError')
const graphqlClient = require('../../graphql-client')
const fs = require('fs')
const path = require('path')

const query = fs.readFileSync(
  path.resolve(__dirname, './remove-tag-from-meme.gql'),
  'utf8'
)

module.exports = async (message, args) => {
  try {
    const name = args[0]
    const tag = args[1]

    await graphqlClient.request(query, { name, tag })
    message.channel.send(`Removed tag ${tag} from ${name}`)
  } catch (error) {
    handleServerError(error)
  }
}
