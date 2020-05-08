require("dotenv").config();

const path = require("path");
const { ShardingManager } = require("discord.js");

const botPath = path.resolve(__dirname, "bot.js");
const manager = new ShardingManager(botPath, {
  token: process.env.DISCORD_TOKEN,
});

manager.spawn();
manager.on("launch", (shard) => console.log(`Launched shard ${shard.id}`));
