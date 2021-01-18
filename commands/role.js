const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'role',
    description: 'give role',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
      console.log(message.guild.id);
      message.guild.members.fetch()
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
      /*if (message.member.roles.cache.has('super weenie hut jr.')) {
        let user = args[0];
        let role = args[1];
        
        if (message.guild.members) {
          console.log(message.guild.members);
        }
        message.reply(`${role}_ROLE_GIVEN_TO: ${user}`);
      } else {
        message.reply(` -_- ACCESS_DENIED -_- `);
      }*/
      
    },
};