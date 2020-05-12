const execute = require("./execute");

module.exports = {
  name: "play",
  description: "plays a meme on the currently joined voice channel",
  usage: "<name>",
  minArgs: 0,
  maxArgs: 0,
  execute,
};
