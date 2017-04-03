const sequelize = require('./init');
const MarkerModel = require('./models/Marker');
const ArticleModel = require('./models/Article');
const UserModel = require('./models/User');

const models = {};

[
  MarkerModel,
  ArticleModel,
  UserModel
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
