const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();



const prefix = ';';

client.on("message", function(message) {
  if (message.author.bot) { return;}
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Ping! This message had a latency of ${timeTaken}ms. BEEP BOOP`);
  }

  else if (command === 'random') {
    if (args.length < 2) { message.reply('Please specify a range. BEEP BOOP.');}
    else if (args.length > 2) { message.reply('Too many numbers! BEEP BOOP.');}
    else {
      const numArg = args.map(x => parseFloat(x));
      const rando = Math.floor(Math.random() * (numArg[1] - numArg[0] + 1) ) + numArg[0];
      if (rando === 69) { message.reply('You rolled a 69. *nice*');}
      else { message.reply('You rolled: ' + rando); }
    }
  }
});

client.login(config.BOT_TOKEN);
