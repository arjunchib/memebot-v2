const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./add-tag-to-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const [name, tag] = args;
  await graphqlClient.request(query, { name, tag });
  message.channel.send(`Added tag ${tag} to ${name}`);
};
