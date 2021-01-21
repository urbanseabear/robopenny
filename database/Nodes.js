const mongoose = require('mongoose');
const db = require('./index.js');

let nodeSchema = new mongoose.Schema({
    type: String,
    func: String,
    items: Array,
    stars: Number,
    time: Array,
    title: String,
    zone: String,
    coords: Array,
    name: String,
    uptime: Number,
    lvl: Number,
    id: Number,
    condition: String,
    bonus: String,
    patch: Number
});

let Nodes = mongoose.model('Node', nodeSchema);
module.exports = Nodes;