const execute = require("./execute");

module.exports = {
  name: "add",
  description: "creates a meme from a youtube link",
  usage: "add <url> <start> <end> <name> [aliases...]",
  minArgs: 4,
  execute,
};
