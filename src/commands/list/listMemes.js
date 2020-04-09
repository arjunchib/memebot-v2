const SortType = require("./SortType");
const fs = require("fs");
const graphqlClient = require("../../graphql-client");
const path = require("path");

const query = fs.readFileSync(path.resolve(__dirname, "./memes.gql"), "utf8");

module.exports = async (message, sortType, options) => {
  let { memes } = await graphqlClient.request(query);

  if (options && options.tag) {
    memes = memes.filter((meme) => meme.tags.includes(options.tag));
  }

  switch (sortType) {
    case SortType.NEWEST:
      memes.sort((x, y) => y.createdAt.localeCompare(x.createdAt));
      break;
    case SortType.OLDEST:
      memes.sort((x, y) => x.createdAt.localeCompare(y.createdAt));
      break;
    case SortType.ALPHABETIC:
      memes.sort((x, y) => x.name.localeCompare(y.name));
      break;
    default:
      memes.sort((x, y) => x.name.localeCompare(y.name));
      break;
  }

  if (options && options.count) {
    memes = memes.slice(0, options.count);
  }

  if (memes.length == 0) {
    message.channel.send("No memes found");
  } else {
    const memesJSON = JSON.stringify(memes.map((meme) => meme.name));
    message.channel.send(memesJSON, {
      split: { char: ",", prepend: "[", append: "]" },
      code: "json",
    });
  }
};
