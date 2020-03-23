const execute = require('./execute')

module.exports = {
  name: 'alias',
  description: 'adds an alias command to a meme',
  usage: 'alias <name> <alias>',
  minArgs: 2,
  maxArgs: 2,
  execute
}
