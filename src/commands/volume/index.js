const execute = require('./execute')

module.exports = {
  name: 'volume',
  description: 'sets the volume of a meme',
  usage: 'volume <name> <volume>',
  minArgs: 2,
  maxArgs: 2,
  execute
}
