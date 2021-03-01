const Discord = require("discord.js");
const { replaceOne } = require("../database/Nodes");

module.exports = {
    name: 'poll',
    description: 'create poll, only allows 10 options because a poll with more than 10 options is kinda silly for most cases',
    args: true,
    usage: 'poll <question?>|option1|option2 etc..',
    execute(message, args) {
      async function react(a, msg) {
        for (let i = 1; i < a; i++) {
          await msg.react(reactions[i]);
        }
      }
      let body = '';
      const reactions = [
      "",
      "🇦",
      "🇧",
      ":regional_indicator_c:",
      ":regional_indicator_d:",
      ":regional_indicator_e:",
      ":regional_indicator_f:",
      ":regional_indicator_g:",
      ":regional_indicator_h:",
      ":regional_indicator_i:",
      ":regional_indicator_j:",
      ":regional_indicator_k:"
      ]
      let msgArr = message.content.split("|");
      let question = msgArr[0].slice(6);
      for (let i = 1; i < msgArr.length; i++) {
        body += reactions[i] + `  ` + msgArr[i] + `\n`;
      }
      message.reply(` asks: "${question}"\n${body}`)
      .then(reply => {
          react(msgArr.length, reply);
      })
      .catch(console.error);
    },
};