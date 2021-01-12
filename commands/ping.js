module.exports = {
    name: 'ping',
    description: 'ping latency',
    execute(message, args) {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Ping! This message had a latency of ${timeTaken}ms. BEEP BOOP`);
    },
};