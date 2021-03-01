const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'market',
    description: 'search for market item on Crystal',
    args: true,
    usage: '<item name>',
    execute(message, args) {
        let item = args.join(' ');
        axios.get(`https://xivapi.com/search?string=${item}`)
        .then((response) => {
          console.log('response', response.data.Results[0]);
          return response.data.Results[0];
        })
        .then((itemObj) => {
          axios.get( `https://universalis.app/api/Crystal/${itemObj.ID}`)
          .then((itemInfo) => {
            let pricePer = [];
            let worlds = [];
            let total = [];
            let listings = itemInfo.data.listings;
            listings.sort((a,b) => a.pricePerUnit - b.pricePerUnit);
            for (let i = 0; i < listings.length; i++) {
              worlds.push(`${listings[i].worldName}`);
              pricePer.push(`${listings[i].pricePerUnit} x ${listings[i].total / listings[i].pricePerUnit}`);
              total.push(`${listings[i].total}`);
            }
            let pages = Math.floor(total.length / 10);
            let finalpage = total.length % 10;
            let embed = new Discord.MessageEmbed()
          .setAuthor(`Lowest Price is on:  ${worlds[0]}`, `https://i.ibb.co/QdNxT3m/Gil-Icon.png`)
          .setThumbnail(`https://xivapi.com${itemObj.Icon}`)
          .setDescription(`${itemObj.Name}`)
          .addField('World', worlds.slice(0, 10).join('\n'), true)
          .addField(`Price Per x Quantity`, pricePer.slice(0, 10).join('\n'), true)
          .addField(`Total Price`, total.slice(0, 10).join('\n'), true);
          message.reply(`Showing 10 cheapest ${itemObj.Name} on Crystal`);
          message.channel.send(embed)
          .then(marketEmbed => {
            marketEmbed.react('👍');
          });
          })
        })
        .catch((err) => {
          console.log(err);
          message.reply(`ERROR`);
        })
    },
};