const Sequelize = require('sequelize');

module.exports = {
  name: 'tutorials',
  model: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.JSON
    },
    type: {
      type: Sequelize.ENUM,
      defaultValue: 'tutorial',
      values: ['tutorial', 'bestpractice']
    }
  }
};
