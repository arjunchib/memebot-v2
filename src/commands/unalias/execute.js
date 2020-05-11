const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./remove-alias-from-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  const [name, alias] = args;
  await graphqlClient.request(query, { name, alias });
  message.channel.send(`Removed alias ${alias} from ${name}`);
};
