const Sequelize = require('sequelize');


module.exports = {
  name: 'logs',
  model: {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.JSON,
    },
    entityId: {
      type: Sequelize.INTEGER
    }
  },
  props: {
    updatedAt: false,
  }
};
