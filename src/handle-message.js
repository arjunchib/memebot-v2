const commands = require("./commands");
const CommandError = require("./utils/command-error");

const prefix = process.env.COMMAND_PREFIX;

module.exports = async (message, graphqlClient) => {
  // Abort if wrong prefix or if message is from a bot
  if (!message.content.startsWith(prefix + " ") || message.author.bot) return;

  // Parse message
  const args = message.content.trim().split(/ +/).slice(1);
  const firstArg = args.shift().toLowerCase();

  // Get command
  const commandName = firstArg in commands ? firstArg : "play";
  const command = commands[commandName];

  // Check arguement length
  const min = command.minArgs || Number.NEGATIVE_INFINITY;
  const max = command.maxArgs || Number.POSITIVE_INFINITY;
  if (args.length < min || args.length > max) {
    message.channel.send(
      `Wrong number of arguments
\`${command.usage}\``
    );
    return;
  }

  // Execute command
  try {
    await command.execute({ message, args, command: firstArg, graphqlClient });
  } catch (e) {
    if (e instanceof CommandError) {
      message.channel.send(e.message);
    } else {
      console.error(e);
      message.channel.send(
        `There was an error trying to execute ${commandName}`
      );
    }
  }
};
