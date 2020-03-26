const execute = require('./execute')

module.exports = {
  name: 'info',
  description: 'get info about a meme',
  usage: 'info <command>',
  minArgs: 1,
  maxArgs: 1,
  execute
}
