const csvFilePath='./items.csv';
const csv=require('csvtojson');
const fs=require('fs');

const readStream=fs.createReadStream('./items.csv');
const writeStream=fs.createWriteStream('./itemsArray.json');

readStream.pipe(csv()).pipe(writeStream);
