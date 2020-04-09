const execute = require("./execute");

module.exports = {
  name: "rename",
  description: "renames a meme",
  usage: "rename <name> <newName>",
  minArgs: 2,
  maxArgs: 2,
  execute,
};
