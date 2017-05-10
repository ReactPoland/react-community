const Sequelize = require('sequelize');

module.exports = {
  name: 'comments',
  model: {
    body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    conversationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'conversations',
        key: 'id'
      },
      allowNull: false
    },
    parentCommentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'comments',
        key: 'id'
      }
    },
    depth: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }
};
