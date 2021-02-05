const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const { POINT_CONVERSION_COMPRESSED } = require("constants");
const oddsAPI = '38aca60d7390554ff75ecd0e87011f2e';

module.exports = {
    name: 'nflodds',
    description: 'return odds for superbowl',
    usage: '^nflodds',
    execute(message, args) {
          axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${oddsAPI}&sport=americanfootball_nfl&region=us&market=spreads`)
          .then((response) => {
            let startTime = new Date(response.data.data[0].commence_time * 1000).toLocaleTimeString("en-US");
            let name = [];
            let lastUpdate = [];
            let pointsFav = [];
            let pointsDog = [];
            let sites = response.data.data[0].sites;
            sites.forEach(betSite => {
                let upTime = new Date(betSite.last_update * 1000).toLocaleTimeString("en-US");
                name.push(`${betSite.site_nice} updated: ${upTime}`);
                pointsFav.push(betSite.odds.spreads.points[0]);
                pointsDog.push(betSite.odds.spreads.points[1]);
            });
            let embed = new Discord.MessageEmbed()
            .setDescription(`Football Odds
            kickoff: ${startTime}
            Participants: ${response.data.data[0].teams.join(`  vs.  `)}`)
            .addField('Site', name.join('\n\n'), true)
            .addField(response.data.data[0].teams[0], pointsFav.join('\n\n'), true)
            .addField(response.data.data[0].teams[1], pointsDog.join('\n\n'), true);
        message.channel.send(embed);
          })
          .catch((err) => {
            console.log(err);
            message.channel.send(`ERROR`);
          });
    },
};