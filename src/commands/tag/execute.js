const handleServerError = require("../../utils/handleServerError");
const graphqlClient = require("../../graphql-client");
const fs = require("fs");
const path = require("path");

const query = fs.readFileSync(
  path.resolve(__dirname, "./add-tag-to-meme.gql"),
  "utf8"
);

module.exports = async (message, args) => {
  try {
    const name = args[0];
    const tag = args[1];

    await graphqlClient.request(query, { name, tag });
    message.channel.send(`Added tag ${tag} to ${name}`);
  } catch (error) {
    handleServerError(error);
  }
};
