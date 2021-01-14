const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'role',
    description: 'give role',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
      user = '';
      message.reply(`ROLE_GIVEN_TO: ${user}`);
    },
};