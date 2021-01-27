const Discord = require("discord.js");
const Nodes = require('../database/Nodes.js');
const Canvas = require('canvas');

module.exports = {
    name: 'unspoiled',
    description: 'get unspoiled node info',
    args: false,
    usage: '^unspoiled',
    execute(message, args) {
      var localEpoch = (new Date()).getTime();
      var epoch = localEpoch * 20.571428571428573;
      var minutes = parseInt((epoch / (1000 * 60)) % 60);
      minutes < 10 ? minutes = `0${minutes.toString()}` : minutes;
      var hours = parseInt((epoch / (1000 * 60 * 60)) % 24);
      Nodes.find({ name: 'Unspoiled', patch: {$gte: 5}, time: {$in: [hours, hours - 1, hours + 1, hours + 2]}})
      .then((results) => {
        let time = '';
        let upTime = 120;
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
          current.time = node.time[0];
          let adjHours = hours > 12 ? hours - 12 : hours;
          if (adjHours < node.time[0]) {
            comingUp.type.push(node.type);
            comingUp.zone.push(`${node.zone} (${node.coords.join(',')})`);
          let gatherables = [];
          node.items.forEach(item => {
            gatherables.push(item.item);
          });
          comingUp.items.push(gatherables.join(', '));
          } else {
            current.type.push(node.type);
            current.zone.push(`${node.zone} (${node.coords.join(',')})`);
            let gatherables = [];
            node.items.forEach(item => {
              gatherables.push(item.item);
            });
            current.items.push(gatherables.join(', '));
          }
          
        });
        
        if (hours > 0 && hours < 12) {
          upTime = upTime - (((hours - current.time) * 60) + minutes);
          time = `Unspoiled Nodes in Eorzea at ${hours}:${minutes} a.m.`;
        } else if (hours === 0) {
          upTime = upTime - minutes;
          time = `Unspoiled Nodes in Eorzea at 12:${minutes} a.m.`;
        } else if (hours === 12) {
          upTime = upTime - minutes;
          time = `Unspoiled Nodes in Eorzea at ${hours}:${minutes} p.m.`;
        } else {
          upTime = upTime - ((((hours - 12) - current.time) * 60) + minutes);
          time = `Unspoiled Nodes in Eorzea at ${hours - 12}:${minutes} p.m.`;
        }
        const canvas = Canvas.createCanvas(1200, 500);
        const ctx = canvas.getContext('2d');
        
        ctx.font = '20px sans-serif';
        let z = ctx.measureText(current.zone.join('\n'));
        let t = ctx.measureText(current.type.join('\n'));
        let i = ctx.measureText(current.items.join('\n'));
        let nextZ = ctx.measureText(comingUp.zone.join('\n'));
        let nextT = ctx.measureText(comingUp.type.join('\n'));
        let nextI = ctx.measureText(comingUp.items.join('\n'));
        let w1 = 100 + z.width + t.width + i.width;
        let w2 = 100 + nextZ.width + nextT.width + nextI.width;
        canvas.width = w1 > w2 ? w1 : w2;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(time, 5, 25);
        ctx.fillText(current.type.join('\n'), 5, 95);
        ctx.fillText(current.zone.join('\n'), 185, 95);
        ctx.fillText(current.items.join('\n'), 200 + z.width, 95);
        
        ctx.font = '25px sans-serif';
        ctx.fillText(`${upTime} Eorzean minutes remaining`, 15, 60);
        ctx.fillText('Upcoming', 15, 130 + z.actualBoundingBoxDescent);

        let newY = 130 + z.actualBoundingBoxDescent;
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(time, 5, 25);
        ctx.fillText(comingUp.type.join('\n'), 5, 30 + newY);
        ctx.fillText(comingUp.zone.join('\n'), 185, 30 + newY);
        ctx.fillText(comingUp.items.join('\n'), 200 + nextZ.width, 30 + newY);
        

        canvas.toBuffer((err, buf) => {
          if (err) throw err // encoding failed
          const attachment = new Discord.MessageAttachment(buf);// buf is PNG-encoded image
          message.channel.send(attachment);
        }); 
      })
      
      
        /*let nodeEmbed = new Discord.MessageEmbed()
          .setAuthor(time)
          .setDescription('Active Nodes:')
          .addField('Unspoiled Nodes', type.join('\n'), true)
          .addField('Location', zone.join('\n'), true)
          .addField('Gatherables', items.join('\n'), true);*/
          .catch(err => {
            console.error(err);
          });
      
        
      
    },
};


