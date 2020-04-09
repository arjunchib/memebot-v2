const execute = require("./execute");

module.exports = {
  name: "unalias",
  description: "remove an alias command from a meme",
  usage: "unalias <name> <alias>",
  minArgs: 2,
  maxArgs: 2,
  execute,
};
