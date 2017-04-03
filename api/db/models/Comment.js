const Sequelize = require('sequelize');

module.exports = {
  name: 'comments',
  model: {
    body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    conversId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'conversations',
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    }
  }
};
