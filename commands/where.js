const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'where',
    description: 'search for item details',
    args: true,
    usage: '<item name>',
    execute(message, args) {
        let item = args.join(' ');
        axios.get(`https://xivapi.com/search?string=${item}`)
        .then((response) => {
          //console.log('response', response.data.Results[0]);
          return axios.get(`https://xivapi.com/item/${response.data.Results[0].ID}`)
        })
        .then((details) => {
            console.log(details);
        })
        .catch((err) => {
            console.error(err);
            message.reply("ERROR");
        })
    }
}