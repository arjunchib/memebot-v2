const { GraphQLClient } = require('graphql-request')

const endpoint = 'http://localhost:4000/graphql'

module.exports = new GraphQLClient(endpoint, { headers: {} })
