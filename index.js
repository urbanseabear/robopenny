const Discord = require("discord.js");
const config = require("./configs/config.json");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const client = new Discord.Client();
const guild = new Discord.Guild();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('I\'m ready!');
});

const prefix = '^';

client.on("message", function(message) {
  if (message.author.bot) { return;}
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `${message.author}!  ERROR! NO ARGUMENTS PROVIDED! ERROR!`;
    if (command.usage) {
      reply += `\nVALID STRUCTURE == \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }
  try {
	  command.execute(message, args);
  } catch (error) {
	  console.error(error);
	  message.reply("-_- INVALID REQUEST -_-");
  }
});

client.login(config.BOT_TOKEN);
