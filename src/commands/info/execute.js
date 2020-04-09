const fs = require("fs");
const path = require("path");
const graphqlClient = require("../../graphql-client");
const CommandError = require("../../utils/CommandError");
const handleServerError = require("../../utils/handleServerError.js");

const query = fs.readFileSync(path.resolve(__dirname, "./info.gql"), "utf8");

module.exports = async (message, args) => {
  try {
    const command = args[0];

    const info = await graphqlClient.request(query, { command });
    if (info.meme == null) {
      throw new CommandError(`There is no meme named ${command}`);
    }
    message.channel.send(JSON.stringify(info.meme, null, 2), { code: "json" });
  } catch (error) {
    handleServerError(error);
  }
};
