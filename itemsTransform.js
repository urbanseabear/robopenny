const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('items.csv')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data);
  })
  .on('end', () => {
    console.log('meow');
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });

  //int32,str,sbyte,str,sbyte,sbyte,sbyte,sbyte,sbyte,str,str,Image,ItemLevel,byte,byte,Row,ItemUICategory,ItemSearchCategory,EquipSlotCategory,ItemSortCategory,uint16,uint32,bit&01,bit&02,bit&04,bit&08,uint32,uint32,bit&10,bit&20,bit&40,ItemAction,byte,uint16,ClassJob,Item,Item,uint16,bit&80,bit&01,uint16,uint16,byte,byte,byte,ClassJobCategory,GrandCompany,ItemSeries,byte,int64,int64,ClassJob,byte,uint16,uint16,uint16,byte,uint16,uint16,uint16,uint16,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,ItemSpecialBonus,byte,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,BaseParam,int16,byte,byte,bit&01,bit&02,byte,bit&04
  //