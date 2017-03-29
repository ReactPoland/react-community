const sequelize = require('./init');
const MarkerModel = require('./models/Marker');
const ArticleModel = require('./models/Article');

const models = {};

[
  MarkerModel,
  ArticleModel
].map(modelItem => {
  models[modelItem.name] = sequelize.define(modelItem.name, {
    ...modelItem.model
  });
});

// sequelize.sync({force: true})
sequelize.sync({})
  .then(() => {
    console.log('sync tables successfull');
  });

module.exports = {
  ...models
};
