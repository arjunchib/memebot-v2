const { GraphQLClient } = require('graphql-request')

const endpoint = process.env.MEMEBOT_API_ENDPOINT

module.exports = new GraphQLClient(endpoint, { headers: {} })
