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
      message.guild.roles.fetch()
      .then( (result) => {
        let role = result.cache.find(role => role.name === `${args[1]}`);
        if (role.id) {
          let user = message.mentions.users.first();
          let member = message.guild.member(user);
          if(member) {
            member.roles.add(role, 'robopenny says so')
            .then(() => {
              message.reply(`${user.tag} given role: ${args[1]}`);
            })
            .catch(err => {
              console.log(err);
            })
          }
        } else {
          message.reply(`no role`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
      
    },
};