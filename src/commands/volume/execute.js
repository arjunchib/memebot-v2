const handleServerError = require("../../utils/handleServerError");
const CommandError = require("../../utils/CommandError");
const graphqlClient = require("../../graphql-client");
const fs = require("fs");
const path = require("path");

const query = fs.readFileSync(
  path.resolve(__dirname, "./update-volume-of-meme.gql"),
  "utf8"
);

module.exports = async (message, args) => {
  try {
    const name = args[0];
    const volume = Number(args[1]);

    if (!Number.isFinite(volume) || volume <= 0) {
      throw new CommandError(
        "Volume must be a non-zero, positive, finite number"
      );
    }

    await graphqlClient.request(query, { name, volume });
    message.channel.send(`Set volume of ${name} to ${volume}`);
  } catch (error) {
    handleServerError(error);
  }
};
