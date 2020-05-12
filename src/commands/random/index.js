const execute = require("./execute");

module.exports = {
  name: "random",
  description: "Play a random meme",
  usage: "random [tag]",
  minargs: 0,
  maxargs: 1,
  execute,
};
