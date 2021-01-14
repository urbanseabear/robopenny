const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'show',
    description: 'show lodestone character',
    args: true,
    usage: '<server> <character name>',
    execute(message, args) {
        let reply = '';
        let server = args.shift().toLowerCase();
        let cName = args.join(' ');
        axios.get(`https://xivapi.com/character/search?name=${cName}&server=${server}`)
        .then((response) => {
          const char = response.data.Results[0];
          reply += `Character Info for ${char.Name}\n${char.Server}\n`;
          return axios.get(`https://xivapi.com/character/${char.ID}`);
        })
        .then(({ data }) => {
          //console.log(data.Character.ClassJobs);
          reply += `${data.Character.FreeCompanyName}\nMinions Owned: ${data.Minions.length}\nMounts Owned: ${data.Mounts.length}\n`;
          let charEmbed = new Discord.MessageEmbed()
            .setImage(data.Character.Portrait)
            .setColor('#7289da');
            //.setAuthor(`${}`)
          message.reply(reply);
          message.channel.send(charEmbed);
        })
        .catch((err) => {
            console.error(err);
        })
       
    },
};