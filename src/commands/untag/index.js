const execute = require('./execute')

module.exports = {
  name: 'untag',
  description: 'remove a tag from a meme',
  usage: 'untag <name> <tag>',
  minArgs: 2,
  maxArgs: 2,
  execute
}
