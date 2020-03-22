const execute = require('./info')

module.exports = {
  name: 'info',
  description: 'get info about a meme',
  usage: 'info <command>',
  minArgs: 1,
  maxArgs: 1,
  execute
}
