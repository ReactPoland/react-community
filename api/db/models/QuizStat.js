const Sequelize = require('sequelize');

module.exports = {
  name: 'quizStats',
  model: {
    finishTime: {
      type: Sequelize.DATE,
    },
    questions: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false
    },
    correctPercent: {
      type: Sequelize.DECIMAL(3, 2)
    }
  },
  props: {
    updatedAt: false
  }
};
