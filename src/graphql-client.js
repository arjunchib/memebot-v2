const { GraphQLClient } = require("graphql-request");

const endpoint = process.env.MEMEBOT_API_ENDPOINT + "/graphql";

module.exports = new GraphQLClient(endpoint, { headers: {} });
