const listMemes = require("./listMemes");
const listTags = require("./listTags");
const SortType = require("./SortType");

module.exports = async ({ message, args, graphqlClient }) => {
  const listType = args.length ? args.shift() : "alpha";
  const listModifier = args.length ? args.shift() : "";

  const listCommands = {
    newest: (message) =>
      listMemes(message, SortType.NEWEST, { count: 50 }, graphqlClient),
    new: (message) =>
      listMemes(message, SortType.NEWEST, { count: 50 }, graphqlClient),
    // set old and oldest to 148 because those are the ones without dates
    oldest: (message) =>
      listMemes(message, SortType.OLDEST, { count: 148 }, graphqlClient),
    old: (message) =>
      listMemes(message, SortType.OLDEST, { count: 148 }, graphqlClient),
    alpha: (message) =>
      listMemes(message, SortType.ALPHABETIC, null, graphqlClient),
    tags: (message) => listTags(message, graphqlClient),
    tag: (message) =>
      listMemes(message, SortType.NEWEST, { tag: listModifier }, graphqlClient),
  };

  // if there is not a command for it then just assume its a tag
  if (listCommands[listType]) {
    await listCommands[listType](message);
  } else {
    await listMemes(message, SortType.NEWEST, { tag: listType }, graphqlClient);
  }
};
