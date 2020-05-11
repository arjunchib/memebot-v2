const { requireGQL } = require("../../utils");
const play = require("../play").execute;

const query = requireGQL(__dirname, "./memes.gql");

module.exports = async ({ message, args, graphqlClient }) => {
  let { memes } = await graphqlClient.request(query);
  if (args != null && args.length === 1) {
    memes = memes.filter((meme) => meme.tags.includes(args[0]));
  }
  const command = memes[Math.floor(Math.random() * memes.length)].names[0];
  console.log(command);
  const playPromise = play({ message, command, graphqlClient });
  message.channel.send(`Now playing ${command}`);
  await playPromise;
};
