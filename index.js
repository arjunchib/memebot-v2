const { ShardingManager } = require('discord.js')
const production = (process.env.NODE_ENV == 'production')

const { token } = production
  ? require('./.config.json')
  : require('./.config-dev.json')

const manager = new ShardingManager('./bot.js', { token: token })

manager.spawn()
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`))
