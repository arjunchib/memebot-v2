module.exports = function(message, commands) {
  const helpMessage = []
  for (const command of commands.values()) {
    helpMessage.push(`**${command.name}** - ${command.description}
\`${command.usage}\``)
  }
  message.channel.send(helpMessage.join('\n\n'))
}
