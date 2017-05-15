const sequelize = require('./init');
const MarkerModel = require('./models/Marker');
const ArticleModel = require('./models/Article');
const UserModel = require('./models/User');
const ConversationModel = require('./models/Conversation');
const CommentModel = require('./models/Comment');
const EventModel = require('./models/Event');
const QuizModel = require('./models/Quiz');
const QuizQuestionModel = require('./models/QuizQuestion');
const QuizAnswerModel = require('./models/QuizAnswer');
const TutorialModel = require('./models/Tutorial');
const LogModel = require('./models/Log');

const models = {};

[
  MarkerModel,
  ArticleModel,
  UserModel,
  ConversationModel,
  EventModel,
  CommentModel,
  QuizModel,
  QuizQuestionModel,
  QuizAnswerModel,
  TutorialModel,
  LogModel
].map(modelItem => {
  models[modelItem.name] = sequelize.define(modelItem.name, {
    ...modelItem.model
  }, {
    ...modelItem.props
  });
});

models.tutorials.belongsTo(models.users, {
  foreignKey: { allowNull: false },
  as: 'author',
  onDelete: 'cascade'
});

models.logs.belongsTo(models.users, {
  as: 'user',
  onDelete: 'cascade'
});

models.quizAnswers.belongsTo(models.quizQuestions, {
  foreignKey: { allowNull: false },
  as: 'question',
  onDelete: 'cascade',
});

models.quizQuestions.belongsTo(models.quizzes, {
  foreignKey: { allowNull: false },
  as: 'quiz',
  onDelete: 'cascade',
});
models.quizQuestions.hasMany(models.quizAnswers, {
  onDelete: 'cascade', // NOTE: probably doesn't need
  as: 'answers',
  foreignKey: 'questionId'
});

models.quizzes.hasMany(models.quizQuestions, {
  onDelete: 'cascade', // NOTE: probably doesn't need
  as: 'questions',
  foreignKey: 'quizId'
});


models.events.belongsTo(models.users, {
  foreignKey: { allowNull: false },
  as: 'organizedBy',
  allowNull: false
});


models.comments.belongsTo(models.users, {
  foreignKey: { allowNull: false },
  as: 'user',
  allowNull: false
});
models.comments.belongsTo(models.conversations, {
  onDelete: 'cascade'
});

models.users.hasMany(models.comments, {
  foreignKey: 'userId',
  as: 'comments'
});

// models.users.hasMany(models.events, { as });

models.conversations.hasMany(models.comments, {
  foreignKey: 'conversationId',
});

models.conversations.belongsTo(models.articles, {
  onDelete: 'cascade'
});

// sequelize.sync({force: true})
sequelize.sync({})
  .then(() => {
    console.log('sync tables successfull');
  });

module.exports = {
  ...models,
  sequelize
};
