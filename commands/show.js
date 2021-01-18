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
          //console.log(data.Character);
          reply = `FC: ${data.Character.FreeCompanyName}\nMinions: ${data.Minions.length}\nMounts: ${data.Mounts.length}\n`;
          let activeJob = data.Character.ActiveClassJob.UnlockedState.Name;
          let jobs = [];
          data.Character.ClassJobs.forEach((job) => {
            let jobStr = `${job.UnlockedState.Name}: ${job.Level}`;
            jobs.push(jobStr)});
          let tanks = jobs.splice(0,4);
          let melee = jobs.splice(0,4);
          let healers = jobs.splice(0,3);
          let ranged = jobs.splice(0,3);
          let magic = jobs.splice(0,4);
          let charEmbed = new Discord.MessageEmbed()
            .setImage(data.Character.Portrait)
            .setColor('#7289da')
            .setAuthor(`${data.Character.Name}`, jobIcons[activeJob])
            .addField('Tanks', tanks.join('\n'), true)
            .addField('Melee DPS', melee.join('\n'), true)
            .addField('Healers', healers.join('\n'), true)
            .addField('Ranged DPS', ranged.join('\n'), true)
            .addField('Magic DPS', magic.join('\n'), true)
            .addField('Craft/Gather', jobs.join('\n'), true)
            .setDescription(reply);
          //message.reply(reply);
          message.channel.send(charEmbed);
        })
        .catch((err) => {
            console.error(err);
        })
       
    },
};