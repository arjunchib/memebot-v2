const { requireGQL, CommandError } = require("../../utils");

const query = requireGQL(__dirname, "./update-volume-of-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const name = args[0];
  const volume = Number(args[1]);

  if (!Number.isFinite(volume) || volume <= 0) {
    throw new CommandError(
      "Volume must be a non-zero, positive, finite number"
    );
  }

  await graphqlClient.request(query, { name, volume });
  message.channel.send(`Set volume of ${name} to ${volume}`);
};
