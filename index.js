const { ShardingManager } = require('discord.js')
const develop = (process.argv[2] == 'develop')

const { token } = develop
  ? require('./.config-dev.json')
  : require('./.config.json')

const manager = new ShardingManager('./bot.js', { token: token })

manager.spawn()
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`))
