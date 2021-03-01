const Discord = require("discord.js");
const Nodes = require('../database/Nodes.js');
const Canvas = require('canvas');

module.exports = {
    name: 'ephemeral',
    description: 'get ephemeral node info',
    args: false,
    usage: '^ephemeral',
    async execute(message, args) {
      var localEpoch = (new Date()).getTime();
      var epoch = localEpoch * 20.571428571428573;
      var minutes = parseInt((epoch / (1000 * 60)) % 60);
      minutes < 10 ? minutes = `0${minutes.toString()}` : minutes;
      var hours = parseInt((epoch / (1000 * 60 * 60)) % 24);
      let nextDay = hours >= 20 ? 0 : hours;
      Nodes.find({ name: 'Ephemeral', patch: {$gte: 5}, time: {$in: [hours, hours - 1, hours - 2, hours - 3, hours + 1, hours + 2, hours + 3, hours + 4, nextDay]}})
      .then((results) => {
        let time = '';
        let upTime = 240;
        let current = {
          type: [],
          zone: [],
          items: []
        }
        let comingUp = {
          type: [],
          zone: [],
          items: []
        }
        console.log(results);
        results.forEach(node => {
          
          if (hours < node.time[0] || (hours > 19 && node.time[0] === 0)) {
            comingUp.time = node.time[0];
            comingUp.type.push(node.type);
            comingUp.zone.push(`${node.zone} (${node.coords.join(',')})`);
          let gatherables = [];
          node.items.forEach(item => {
            gatherables.push(item.item);
          });
          comingUp.items.push(gatherables.join(', '));
          } else {
            current.time = node.time[0];
            current.type.push(node.type);
            current.zone.push(`${node.zone} (${node.coords.join(',')})`);
            let gatherables = [];
            node.items.forEach(item => {
              gatherables.push(item.item);
            });
            current.items.push(gatherables.join(', '));
          }
          
        });
        let aOrP = '';
        if (hours > 0 && hours < 12) {
          aOrP = 'a.m.';
          upTime = upTime - (((hours - current.time) * 60) + minutes);
          time = `Ephemeral Nodes in Eorzea at ${hours}:${minutes} a.m.`;
        } else if (hours === 0) {
          upTime = upTime - minutes;
          comingUp.time = 12;
          aOrP = 'a.m.';
          time = `Ephemeral Nodes in Eorzea at 12:${minutes} a.m.`;
        } else if (hours === 12) {
          upTime = upTime - minutes;
          aOrP = 'p.m.';
          time = `Ephemeral Nodes in Eorzea at ${hours}:${minutes} p.m.`;
        } else {
          comingUp.time -= 12;
          comingUp.time === -12 ? aOrP = 'a.m.' : aOrP = 'p.m.';
          comingUp.time = Math.abs(comingUp.time);
          upTime = upTime - (((hours - current.time) * 60) + minutes);
          time = `Ephemeral Nodes in Eorzea at ${hours - 12}:${minutes} p.m.`;
        }
        const canvas = Canvas.createCanvas(1200, 300);
        const ctx = canvas.getContext('2d');
        
        ctx.font = '20px sans-serif';
        let z = ctx.measureText(current.zone.join('\n'));
        let t = ctx.measureText(current.type.join('\n'));
        let i = ctx.measureText(current.items.join('\n'));
        canvas.width = 100 + z.width + t.width + i.width;

        ctx.fillStyle = '#242121';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(time, 5, 25);
        ctx.fillText(current.type.join('\n'), 5, 95);
        ctx.fillText(current.zone.join('\n'), 200, 95);
        ctx.fillText(current.items.join('\n'), 215 + z.width, 95);
        
        ctx.font = '25px sans-serif';
        ctx.fillText(`${upTime} Eorzean minutes remaining`, 15, 60);
        ctx.fillText(`Upcoming at ${comingUp.time}:00 ${aOrP}`, 15, 130 + z.actualBoundingBoxDescent);

        let newY = 130 + z.actualBoundingBoxDescent;
        ctx.font = '20px sans-serif';
        z = ctx.measureText(comingUp.zone.join('\n'));
        ctx.fillStyle = '#ffffff';
        ctx.fillText(time, 5, 25);
        ctx.fillText(comingUp.type.join('\n'), 5, 30 + newY);
        ctx.fillText(comingUp.zone.join('\n'), 200, 30 + newY);
        ctx.fillText(comingUp.items.join('\n'), 215 + z.width, 30 + newY);
        

        canvas.toBuffer((err, buf) => {
          if (err) throw err // encoding failed
          const attachment = new Discord.MessageAttachment(buf);// buf is PNG-encoded image
          message.channel.send(attachment);
        }); 
      })
      
    
          .catch(err => {
            console.error(err);
          });
      
        
      
    },
};
