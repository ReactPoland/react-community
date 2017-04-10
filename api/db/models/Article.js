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
      type: Sequelize.STRING(1234),
      allowNull: false
    },
    previewSize: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL),
      allowNull: false,
      defaultValue: [1, 1]
    }
  }
};
