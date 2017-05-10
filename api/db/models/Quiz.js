const Sequelize = require('sequelize');

module.exports = {
  name: 'quizzes',
  model: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    }
  }
};
