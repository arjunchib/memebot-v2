const listMemes = require("./listMemes");
const listTags = require("./listTags");
const SortType = require("./SortType");
const handleServerError = require("../../utils/handleServerError.js");

module.exports = async (message, args) => {
  try {
    const listType = args.length ? args.shift() : "alpha";
    const listModifier = args.length ? args.shift() : "";

    const listCommands = {
      newest: (message) => listMemes(message, SortType.NEWEST, { count: 50 }),
      new: (message) => listMemes(message, SortType.NEWEST, { count: 50 }),
      // set old and oldest to 148 because those are the ones without dates
      oldest: (message) => listMemes(message, SortType.OLDEST, { count: 148 }),
      old: (message) => listMemes(message, SortType.OLDEST, { count: 148 }),
      alpha: (message) => listMemes(message, SortType.ALPHABETIC),
      tags: (message) => listTags(message),
      tag: (message) =>
        listMemes(message, SortType.NEWEST, { tag: listModifier }),
    };

    // if there is not a command for it then just assume its a tag
    if (listCommands[listType]) {
      listCommands[listType](message);
    } else {
      listMemes(message, SortType.NEWEST, { tag: listType });
    }
  } catch (error) {
    handleServerError(error);
  }
};
