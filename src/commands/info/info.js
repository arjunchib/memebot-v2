const fs = require('fs')
const path = require('path')
const client = require('../../client.js')
const CommandError = require('../../CommandError.js')
const { codeBlockify } = require('../../utils.js')

const query = fs.readFileSync(path.resolve(__dirname, './query.gql'))

module.exports = async (message, args) => {
  const command = args[0]

  try {
    const info = await client.request(query, { command })
    console.log(typeof info)
    if (info.meme === null) {
      console.log(info)
      throw new CommandError('There is no meme named ' + command + '.')
    }
    message.channel.send(codeBlockify(JSON.stringify(info.meme, null, 2)))
  } catch (error) {
    if (error instanceof CommandError) {
      throw error
    } else {
      console.error(error)
      throw new CommandError(
        'Something went wrong when getting info on this meme'
      )
    }
  }
}
