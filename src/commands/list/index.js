const execute = require("./execute");

module.exports = {
  name: "list",
  description: "list all memes",
  usage: "list",
  minArgs: 0,
  maxArgs: 2,
  execute,
};
