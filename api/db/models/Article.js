// const sequelize = require('../init');
const Sequelize = require('sequelize');

// const MarkerModel = sequelize.define('markers', {

// });

module.exports = {
  name: 'articles',
  model: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    previewSize: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL),
      allowNull: false,
      defaultValue: [1, 1]
    },
    plainText: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    slug: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    type: {
      type: Sequelize.ENUM,
      defaultValue: 'own',
      values: ['external', 'own']
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null
    }
  }
};
