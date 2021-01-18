const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'kick',
    description: 'kick user from server',
    args: true,
    usage: '<user>',
    execute(message, args) {
      user = '';
      message.reply(`REMOVING... ${user}`);
    },
};