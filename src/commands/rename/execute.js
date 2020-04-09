const handleServerError = require("../../utils/handleServerError");
const graphqlClient = require("../../graphql-client");
const fs = require("fs");
const path = require("path");

const query = fs.readFileSync(
  path.resolve(__dirname, "./rename-meme.gql"),
  "utf8"
);

module.exports = async (message, args) => {
  try {
    const name = args[0];
    const newName = args[1];

    await graphqlClient.request(query, { name, newName });
    message.channel.send(`Rename ${name} to ${newName}`);
  } catch (error) {
    handleServerError(error);
  }
};
