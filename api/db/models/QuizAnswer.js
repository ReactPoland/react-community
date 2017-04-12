const Sequelize = require('sequelize');

module.exports = {
  name: 'quizAnswers',
  model: {
    answer: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    correct: {
      type: Sequelize.BOOLEAN,
      allowNull: null,
      defaultValue: false
    }
  }
};
