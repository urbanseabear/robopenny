const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'g',
    description: 'random garfield without garfield comic',
    execute(message, args) {
        const randomPage = Math.floor(Math.random() * (470 - 2 + 1) ) + 2;
        let imageUrl = '';
          axios.get(`https://garfieldminusgarfield.net/page/${randomPage}`)
          .then((response) => {
            const resourceLoad = new jsdom.ResourceLoader();
            const dom = new JSDOM(response.data, {resources: resourceLoad});
            const { document } = dom.window;
            const body = document.querySelector("body");
            const image = body.querySelector("div#content > div.photo > a > img");
            imageUrl = image.src;
            let embed = new Discord.MessageEmbed()
            .setDescription(`https://garfieldminusgarfield.net/page/${randomPage}`)
          .setImage(imageUrl);
        message.reply('Enjoy Jon\'s existential dread!\n');
        message.channel.send(embed);
          })
          .catch((err) => {
            console.log(err);
            message.send(`ERROR`);
          });
    },
};