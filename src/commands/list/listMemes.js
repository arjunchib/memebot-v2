const SortType = require("./SortType");
const { requireGQL } = require("../../utils");

const query = requireGQL(__dirname, "./memes.gql");

module.exports = async (message, sortType, options, graphqlClient) => {
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
      memes.sort((x, y) => x.names[0].localeCompare(y.names[0]));
      break;
    default:
      memes.sort((x, y) => x.names[0].localeCompare(y.names[0]));
      break;
  }

  if (options && options.count) {
    memes = memes.slice(0, options.count);
  }

  if (memes.length == 0) {
    message.channel.send("No memes found");
  } else {
    const memesJSON = JSON.stringify(memes.map((meme) => meme.names[0]));
    message.channel.send(memesJSON, {
      split: { char: "," },
      code: "json",
    });
  }
};
