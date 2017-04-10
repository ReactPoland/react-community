// const sequelize = require('../init');
const Sequelize = require('sequelize');

// const MarkerModel = sequelize.define('markers', {

// });

module.exports = {
  name: 'markers',
  model: {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    lat: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    lng: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    googleLocationId: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: [1, 1]
    }
  }
};
