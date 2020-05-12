const { CommandError, requireGQL } = require("../../utils");

const isAlreadyPlaying = (message) => {
  return message.client.voice.connections.find(
    (connection) => connection.channel === message.member.voiceChannel
  );
};

const query = requireGQL(__dirname, "./meme.gql");

module.exports = async ({ message, command, graphqlClient }) => {
  if (!message.member.voice.channel) {
    throw new CommandError("You must join a voice channel to play memes");
  }

  if (isAlreadyPlaying(message)) return;

  const { meme } = await graphqlClient.request(query, { name: command });

  if (meme === null) {
    throw new CommandError(`There are no memes named ${command}`);
  }

  const connection = await message.member.voice.channel.join();
  const dispatcher = connection.play(meme.originUrl);
  dispatcher.setVolumeLogarithmic(meme.volume);
  dispatcher.on("finish", () => {
    connection.disconnect();
  });
};
