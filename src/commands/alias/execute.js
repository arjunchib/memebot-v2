const fs = require("fs");
const path = require("path");
const graphqlClient = require("../../graphql-client");
const handleServerError = require("../../utils/handleServerError.js");

const query = fs.readFileSync(
  path.resolve(__dirname, "./add-alias-to-meme.gql"),
  "utf8"
);

module.exports = async (message, args) => {
  try {
    const name = args[0];
    const alias = args[1];

    await graphqlClient.request(query, { name, alias });
    message.channel.send(`Added command ${alias} to ${name}`);
  } catch (error) {
    handleServerError(error);
  }
};
