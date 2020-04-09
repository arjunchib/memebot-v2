const handleServerError = require("../../utils/handleServerError");
const graphqlClient = require("../../graphql-client");
const fs = require("fs");
const path = require("path");

const query = fs.readFileSync(
  path.resolve(__dirname, "./remove-alias-from-meme.gql"),
  "utf8"
);

module.exports = async (message, args) => {
  try {
    const name = args[0];
    const alias = args[1];

    await graphqlClient.request(query, { name, alias });
    message.channel.send(`Removed command ${alias} from ${name}`);
  } catch (error) {
    handleServerError(error);
  }
};
