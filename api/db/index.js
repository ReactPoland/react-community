const sequelize = require('./init');
const MarkerModel = require('./models/Marker');
const ArticleModel = require('./models/Article');
const UserModel = require('./models/User');
const ConversationModel = require('./models/Conversation');
const CommentModel = require('./models/Comment');
const EventModel = require('./models/Event');
const StateModel = require('./models/State');
const CityModel = require('./models/City');
const Locations = require('./models/Locations');

const models = {};

[
  MarkerModel,
  ArticleModel,
  UserModel,
  ConversationModel,
  EventModel,
  CommentModel,
  StateModel,
  CityModel,
  Locations
].map(modelItem => {

  models[modelItem.name] = sequelize.define(modelItem.name, {
    ...modelItem.model
  },
  modelItem.additional
  );
});


models.events.belongsTo(models.users, {
  foreignKey: { allowNull: false },
  as: 'organizedBy',
  allowNull: false
});


models.comments.belongsTo(models.users);
models.comments.belongsTo(models.conversations);

models.users.hasMany(models.comments);
// models.users.hasMany(models.events, { as });

models.conversations.hasMany(models.comments, { foreignKey: 'conversationId' });
models.conversations.belongsTo(models.articles);

// sequelize.sync({force: true})
sequelize.sync({})
  .then(() => {
    console.log('sync tables successfull');
  });

module.exports = {
  ...models
};
