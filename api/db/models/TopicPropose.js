const Sequelize = require('sequelize');

module.exports = {
  name: 'topicProposes',
  model: {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  props: {
    updatedAt: false
  }
};
