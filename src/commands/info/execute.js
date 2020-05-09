const { CommandError, requireGQL } = require("../../utils");

const query = requireGQL("./info.gql");

module.exports = async ({ message, command, graphqlClient }) => {
  const info = await graphqlClient.request(query, { command });
  if (info.meme == null) {
    throw new CommandError(`There is no meme named ${command}`);
  }
  message.channel.send(JSON.stringify(info.meme, null, 2), {
    code: "json",
  });
};
