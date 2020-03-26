const fs = require('fs')
const path = require('path')
const graphqlClient = require('../../graphql-client')
const handleServerError = require('../../utils/handleServerError.js')

const query = fs.readFileSync(
  path.resolve(__dirname, './create-meme.gql'),
  'utf8'
)

module.exports = async (message, args) => {
  try {
    message.channel.startTyping()

    const name = args[3]

    await graphqlClient.request(query, {
      name,
      authorID: message.member.id,
      authorName: message.member.displayName,
      url: args[0],
      start: args[1],
      end: args[2]
    })
    message.channel.send(`Added command ${name}`)
  } catch (error) {
    handleServerError(error)
  } finally {
    message.channel.stopTyping(true)
  }
}
