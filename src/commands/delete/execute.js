const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./delete-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const name = args[0];
  await graphqlClient.request(query, { name });
  message.channel.send(`Deleted ${name}`);
};
