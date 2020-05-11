const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./add-alias-to-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const [name, alias] = args;
  await graphqlClient.request(query, { name, alias });
  message.channel.send(`Added alias ${alias} to ${name}`);
};
