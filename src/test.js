const Discord = require('discord.js')

const { token } = require('./.config-dev.json')

const client = new Discord.Client()

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  console.log(message)
})

client.login(token)
