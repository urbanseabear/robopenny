const fs = require('fs');
const axios = require('axios');




axios.get('https://garlandtools.org/bell/nodes.js')
.then((response) => {
  let jsonStr = response.data.slice(16, response.data.length - 2);
  let allNodes = JSON.parse(jsonStr);
  fs.writeFileSync('nodesClean.json', '[');
  for (let i = 0; i < allNodes.length; i++) {
    let nodeStr = JSON.stringify(allNodes[i]);
    if ( i !== allNodes.length - 1) {
      nodeStr = nodeStr + ',';
    }
    fs.appendFileSync('nodesClean.json', nodeStr);
  }
  fs.appendFileSync('nodesClean.json', ']');
})
.catch((err) => {
  console.log(err);
})

  