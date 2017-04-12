const Sequelize = require('sequelize');

module.exports = {
  name: 'quizQuestions',
  model: {
    question: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
  }
};
