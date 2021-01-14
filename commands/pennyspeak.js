const Discord = require("discord.js");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

module.exports = {
    name: 'pennyspeak',
    description: 'go random bullshit!',
    execute(message, args) {
        const opening = ['i', 'just', '', '', '', '', 'ask me how i', 'completely', 'Tachi', 'nearly', 'productively', 'efficiently', 'last night i', 'that wizard', 'a ninja', 'a seedy old man','Doc'];
        const verbs = ['███████', 'downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'hax0red', 'aided', 'enjoyed', 'engineered', 'farted', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
        const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of', 'some type of', 'a whole lotta'];
        const nouns = ['cat', 'tachi', 'your face', 'koolaid', 'system', 'city', 'butts', 'worm', 'cloud', 'potato', 'money', 'way of life', 'uwu', 'belief system', 'security system', 'gamer', 'bad decision', 'future', 'life', 'pony', 'mind'];
        const tags = ['#techlife', '#sf', 'but only i know how', 'for real', '#UwU', '#ffxiv', '#omg', 'OwO', '#yolo', '#magic', '', '', '', ''];
    
        const randomElement = function(array){
          const randomIndex = Math.floor(Math.random() * array.length);
          return array[randomIndex];
        };
    
        const randomMessage = function(){
          return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
        };
        message.reply(randomMessage());
    },
};