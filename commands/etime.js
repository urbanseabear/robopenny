const Discord = require("discord.js");
const Nodes = require('../database/Nodes.js');
const Canvas = require('canvas');

module.exports = {
    name: 'etime',
    description: 'get Eorzea Time',
    args: false,
    usage: '^etime',
    async execute(message, args) {
      var localEpoch = (new Date()).getTime();
      var epoch = localEpoch * 20.571428571428573;
      var minutes = parseInt((epoch / (1000 * 60)) % 60);
      minutes < 10 ? minutes = `0${minutes.toString()}` : minutes;
      var hours = parseInt((epoch / (1000 * 60 * 60)) % 24);

      getNodeData = () => {
        let nodeData = {
          time: '',
          type: [],
          zone: [],
          items: []
        }
        Nodes.find({ name: 'Unspoiled', patch: {$gte: 5}, time: {$in: [hours, hours - 1]}})
        .then((results) => {
          
          if (hours < 12) {
            nodeData.time = `Current Time in Eorzea: ${hours}:${minutes} a.m.`;
          } else if (hours === 24) {
            nodeData.time = `Current Time in Eorzea: ${hours - 12}:${minutes} a.m.`;
          } else if (hours === 12) {
            nodeData.time = `Current Time in Eorzea: ${hours}:${minutes} p.m.`;
          } else {
            nodeData.time = `Current Time in Eorzea: ${hours - 12}:${minutes} p.m.`;
          }
          results.forEach(node => {
            nodeData.type.push(node.type);
            nodeData.zone.push(`${node.zone} (${node.coords.join(',')})`);
            let gatherables = [];
            node.items.forEach(item => {
              gatherables.push(item.item);
            });
            nodeData.items.push(gatherables.join(', '));
          });
          return Promise.resolve(nodeData);
        })
        .catch(err => {
          console.error(err);
        });
      }
      
      
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        
        ctx.strokeStyle = 'green';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#ffffff';
        const nodeInfo = await getNodeData();
        ctx.fillText(nodeInfo.time, 50, 50);
        canvas.toBuffer((err, buf) => {
          if (err) throw err // encoding failed
          const attachment = new Discord.MessageAttachment(buf);// buf is PNG-encoded image
          message.channel.send(attachment);
        });  
      
    },
};


