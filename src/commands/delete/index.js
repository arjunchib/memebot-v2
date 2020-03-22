const execute = require('./delete')

module.exports = {
  name: 'delete',
  description: 'removes a command',
  usage: 'delete <name>',
  minArgs: 1,
  maxArgs: 1,
  execute
}
