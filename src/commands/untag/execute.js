const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./remove-tag-from-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const [name, tag] = args;
  await graphqlClient.request(query, { name, tag });
  message.channel.send(`Removed tag ${tag} from ${name}`);
};
