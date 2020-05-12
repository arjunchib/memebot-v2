const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./tags.gql");

module.exports = async (message, graphqlClient) => {
  const { tags } = await graphqlClient.request(query);
  tags.sort();
  message.channel.send(JSON.stringify(tags), {
    split: { char: ",", prepend: "[", append: "]" },
    code: "json",
  });
};
