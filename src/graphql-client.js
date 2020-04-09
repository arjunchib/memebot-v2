const { GraphQLClient } = require("graphql-request");

const endpoint = process.env.MEMEBOT_API_BASE_URL + "/graphql";

module.exports = new GraphQLClient(endpoint, { headers: {} });
