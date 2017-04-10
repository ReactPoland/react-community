const Sequelize = require('sequelize');

module.exports = {
  name: 'conversations',
  model: {
    articleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'articles',
        key: 'id'
      },
      allowNull: false
    },
  }
};
