const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./create-meme.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  try {
    message.channel.startTyping();

    const [url, start, end] = args.splice(0, 3);
    const names = args;

    await graphqlClient.request(query, {
      names,
      authorID: message.member.id,
      authorName: message.member.displayName,
      url,
      start,
      end,
    });
    message.channel.send(`Added meme ${names[0]}`);
  } catch (error) {
    throw error;
  } finally {
    message.channel.stopTyping(true);
  }
};
