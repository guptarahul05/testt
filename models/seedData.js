const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const db = require('../utils/database');
const basename = path.basename(__filename);
const associations = require('./Associations');
const associationSequence = ['user', 'session'];
associations();
db.sync({
  force: true
}).then(() => {
  const models = [];
  const seedDataList = [];
  const queryArray = [];
  const modelFileList = fs.readdirSync(__dirname).filter(filename => {
    return (
      filename.indexOf('.') !== 0 &&
      filename !== basename &&
      filename.slice(-3) === '.js' &&
      filename !== 'Associations.js'
    );
  });
  const seedFileList = fs.readdirSync(path.join('..', 'seeddata'));

  modelFileList.forEach(model => {
    const data = {
      name: model.slice(0, model.length - 3).toLowerCase(),
      modelObject: require(path.join(__dirname, model))
    };
    models.push(data);
  });
  seedFileList.forEach(seedFile => {
    const data = {
      name: seedFile.slice(0, seedFile.length - 3).toLowerCase(),
      data: require(path.join('..', 'seeddata', seedFile))
    };
    seedDataList.push(data);
  });
  associationSequence.forEach(a => {
    const modelObject = models.filter(modelFile => {
      return modelFile.name === a;
    })[0].modelObject;
    const modelSeedData = seedDataList.filter(seedData => {
      return seedData.name === a;
    })[0].data;
    queryArray.push(modelObject.bulkCreate(modelSeedData));
  });
  Promise.all(queryArray).then(result => {
    console.log(`Success${result}`);
  });
});
