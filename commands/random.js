const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'random',
    description: 'random number gen',
    args: true,
    usage: '<number> or <number1 number2>',
    execute(message, args) {
        if (args.length < 2) {
            const numArg = args.map(x => parseFloat(x));
            const rando = Math.floor(Math.random() * Math.floor(numArg[0]));
            if (rando === 69) { message.reply('You rolled a 69. *nice*');}
            else { message.reply('You rolled: ' + rando); }}
          else if (args.length > 2) { message.reply('Too many numbers! BEEP BOOP.');}
          else {
            const numArg = args.map(x => parseFloat(x));
            const rando = Math.floor(Math.random() * (numArg[1] - numArg[0] + 1) ) + numArg[0];
            if (rando === 69) { message.reply('You rolled a 69. *nice*');}
            else { message.reply('You rolled: ' + rando); }
          }
    },
};


