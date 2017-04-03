const sequelize = require('./init');
const MarkerModel = require('./models/Marker');
const ArticleModel = require('./models/Article');
const UserModel = require('./models/User');
const ConversationModel = require('./models/Conversation');
const CommentModel = require('./models/Comment');

const models = {};

[
  MarkerModel,
  ArticleModel,
  UserModel,
  ConversationModel,
  CommentModel
].map(modelItem => {
  models[modelItem.name] = sequelize.define(modelItem.name, {
    ...modelItem.model
  });
});

models.comments.belongsTo(models.users);
models.comments.belongsTo(models.conversations);

models.conversations.hasMany(models.comments, { foreignKey: 'conversId' });
models.conversations.belongsTo(models.articles);

// sequelize.sync({force: true})
sequelize.sync({})
  .then(() => {
    console.log('sync tables successfull');
  });

module.exports = {
  ...models
};
