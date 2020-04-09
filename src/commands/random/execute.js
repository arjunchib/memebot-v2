const fs = require("fs");
const graphqlClient = require("../../graphql-client");
const handleServerError = require("../../utils/handleServerError");
const path = require("path");
const play = require("../play").execute;

const query = fs.readFileSync(path.resolve(__dirname, "./memes.gql"), "utf8");

module.exports = async (message, args) => {
  try {
    let { memes } = await graphqlClient.request(query);

    if (args != null && args.length === 1) {
      memes = memes.filter((meme) => meme.tags.includes(args[0]));
    }

    const chosenMeme = memes[Math.floor(Math.random() * memes.length)].name;

    play(message, chosenMeme);

    message.channel.send(`Now playing ${chosenMeme}`);
  } catch (error) {
    handleServerError(error);
  }
};
