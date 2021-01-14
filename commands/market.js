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
            let itemList = [];
            let listings = itemInfo.data.listings;
            listings.sort((a,b) => a.pricePerUnit - b.pricePerUnit);
            for (let i = 0; i < listings.length; i++) {
              listing = `World: ${listings[i].worldName} Price(each):  ${listings[i].pricePerUnit} Total:  ${listings[i].total}\n`;
              itemList.push(listing);
            }
            let pages = Math.floor(itemList.length / 10);
            let finalpage = itemList.length % 10;
            let embed = new Discord.MessageEmbed()
          .setImage(`https://i.ibb.co/QdNxT3m/Gil-Icon.png`)
          .setThumbnail(`https://xivapi.com${itemObj.Icon}`)
          .setDescription(itemList.slice(0, 10).join('\n'));
          message.reply(`Showing 10 cheapest ${itemObj.Name} on Crystal`);
          })
        })
        .catch((err) => {
          console.log(err);
          message.reply(`ERROR`);
        })
    },
};