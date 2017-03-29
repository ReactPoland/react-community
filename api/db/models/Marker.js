// const sequelize = require('../init');
const Sequelize = require('sequelize');

// const MarkerModel = sequelize.define('markers', {

// });

module.exports = {
  name: 'markers',
  model: {
    name: Sequelize.STRING,
    link: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT
  }
};
