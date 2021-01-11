const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();



const prefix = '^';

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
  
  else if (command === 'market') {

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

  else if (command === 'g') {
    const randomPage = Math.floor(Math.random() * (470 - 2 + 1) ) + 2;
    message.reply('Enjoy Jon\'s existential dread!\nhttps://garfieldminusgarfield.net/page/' + randomPage);
  }

  else if (command === 'pennyspeak') {
    const opening = ['poggers, i', 'just', '', '', '', '', 'ask me how i', 'completely', 'poggers', 'Tachi', 'nearly', 'productively', 'efficiently', 'last night i', 'poggers', 'that wizard', 'a ninja', 'a seedy old man','Doc'];
    const verbs = ['███████', 'downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'hax0red', 'aided', 'enjoyed', 'engineered', 'farted', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
    const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of', 'some type of', 'a whole lotta'];
    const nouns = ['cat', 'tachi', 'your face', 'koolaid', 'system', 'city', 'butts', 'worm', 'cloud', 'potato', 'money', 'way of life', 'uwu', 'belief system', 'security system', 'gamer', 'bad decision', 'future', 'life', 'pony', 'mind'];
    const tags = ['#techlife', '#pog', '#sf', '#biggestyike', 'but only i know how', 'for real', '#UwU', '#ffxiv', '#omg', 'OwO', '#yolo', '#magic', '', '', '', ''];

    const randomElement = function(array){
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    const randomMessage = function(){
      return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
    };
    message.reply(randomMessage());
  }

  else {
    message.reply("-_- INVALID REQUEST -_-");
  }
});

client.login(config.BOT_TOKEN);
