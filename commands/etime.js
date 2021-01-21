const Discord = require("discord.js");
const Nodes = require('../database/Nodes.js');

module.exports = {
    name: 'etime',
    description: 'get Eorzea Time',
    args: false,
    usage: '^etime',
    execute(message, args) {
      var localEpoch = (new Date()).getTime();
      var epoch = localEpoch * 20.571428571428573;
      var minutes = parseInt((epoch / (1000 * 60)) % 60);
      minutes < 10 ? minutes = `0${minutes.toString()}` : minutes;
      var hours = parseInt((epoch / (1000 * 60 * 60)) % 24);
      Nodes.find({ name: 'Unspoiled', patch: {$gte: 5}, time: {$in: [hours, hours - 1]}})
      .then((results) => {
        let time = '';
        if (hours < 12) {
          time = `Current Time in Eorzea: ${hours}:${minutes} a.m.`;
        } else if (hours === 24) {
          time = `Current Time in Eorzea: ${hours - 12}:${minutes} a.m.`;
        } else if (hours === 12) {
          time = `Current Time in Eorzea: ${hours}:${minutes} p.m.`;
        } else {
          time = `Current Time in Eorzea: ${hours - 12}:${minutes} p.m.`;
        }
        let type = [];
        let zone = [];
        let items = [];
        results.forEach(node => {
          type.push(node.type);
          zone.push(`${node.zone} (${node.coords.join(',')})`);
          let gatherables = [];
          node.items.forEach(item => {
            gatherables.push(item.item);
          });
          items.push(gatherables.join(', '));
        });
        let nodeEmbed = new Discord.MessageEmbed()
          .setAuthor(time)
          .setDescription('Active Nodes:')
          .addField('Unspoiled Nodes', type.join('\n'), true)
          .addField('Location', zone.join('\n'), true)
          .addField('Gatherables', items.join('\n'), true);
          message.channel.send(nodeEmbed);
      })
      .catch(err => {
        console.error(err);
      })
      
      
    },
};


