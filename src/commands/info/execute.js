const { CommandError, requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./info.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const name = args[0];
  const info = await graphqlClient.request(query, { name });
  if (info.meme == null) {
    throw new CommandError(`There is no meme named ${name}`);
  }
  info.meme.createdAt = new Date(info.meme.createdAt).toUTCString();
  message.channel.send(JSON.stringify(info.meme, null, 2), {
    code: "json",
  });
};
