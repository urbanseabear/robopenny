const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'egirl',
    description: 'get egirl',
    args: false,
    usage: '^etime',
    execute(message, args) {
        let embed = new Discord.MessageEmbed()
        .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/32134a6b-49b4-425a-af98-2eca8656665f/db092gr-40b12596-e00d-4a15-a221-2c225dd0f8cd.png/v1/fill/w_600,h_644,q_80,strp/miku_hatsune_weight_gain_drive____part_3_by_pinkforsythia_db092gr-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02NDQiLCJwYXRoIjoiXC9mXC8zMjEzNGE2Yi00OWI0LTQyNWEtYWY5OC0yZWNhODY1NjY2NWZcL2RiMDkyZ3ItNDBiMTI1OTYtZTAwZC00YTE1LWEyMjEtMmMyMjVkZDBmOGNkLnBuZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ffATPtDSncsVqiH2C6QoOh4KjWmZGQtBJDJck_G7Tgw');
        message.channel.send(embed);
      
    },
};


