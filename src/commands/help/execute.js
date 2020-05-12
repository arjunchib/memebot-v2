module.exports = async ({ message, commands }) => {
  const helpMessage = Object.values(commands).map((command) => {
    return `**${command.name}** - ${command.description}
\`${command.usage}\``;
  });
  message.channel.send(helpMessage.join("\n\n"));
};
