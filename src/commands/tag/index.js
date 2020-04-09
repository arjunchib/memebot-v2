const execute = require("./execute");

module.exports = {
  name: "tag",
  description: "adds a tag to a meme",
  usage: "tag <name> <tag>",
  minArgs: 2,
  maxArgs: 2,
  execute,
};
