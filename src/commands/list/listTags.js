const fs = require('fs')
const graphqlClient = require('../../graphql-client')
const path = require('path')

const query = fs.readFileSync(path.resolve(__dirname, './tags.gql'), 'utf8')

module.exports = async message => {
  const { tags } = await graphqlClient.request(query)

  tags.sort()

  message.channel.send(JSON.stringify(tags), {
    split: { char: ',', prepend: '[', append: ']' },
    code: 'json'
  })
}
