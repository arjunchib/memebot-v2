function isAlreadyPlaying(message) {
  return message.client.voice.connections.find(
    (connection) => connection.channel === message.member.voiceChannel
  );
}

module.exports = {
  isAlreadyPlaying,
};
