const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const jobIcons = require('./jobIcons.js');


module.exports = {
    name: 'show',
    description: 'show lodestone character',
    args: true,
    usage: '<server> <character name>',
    execute(message, args) {
        
        let reply = '';
        const char = [];
        let server = args.shift().toLowerCase();
        let cName = args.join(' ');
        axios.get(`https://xivapi.com/character/search?name=${cName}&server=${server}`)
        .then((response) => {
          char.push(response.data.Results[0]);
          reply += `Character Info for ${char[0].Name}\n${char[0].Server}\n`;
          return axios.get(`https://xivapi.com/character/${char[0].ID}`);
        })
        .then(({ data }) => {
          console.log(data.Character);
          reply = `FC: ${data.Character.FreeCompanyName}\nMinions: ${data.Minions.length}\nMounts: ${data.Mounts.length}\n`;
          let activeJob = data.Character.ActiveClassJob.UnlockedState.Name;
          let charEmbed = new Discord.MessageEmbed()
            .setImage(data.Character.Portrait)
            .setColor('#7289da')
            .setAuthor(`${data.Character.Name}`, jobIcons[activeJob])
            .addField('Combat Jobs', ':wave: 80', true)
            .setDescription(reply);
          //message.reply(reply);
          message.channel.send(charEmbed);
        })
        .catch((err) => {
            console.error(err);
        })
       
    },
};