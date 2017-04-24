const Sequelize = require('sequelize');

module.exports = {
  name: 'cities',
  model: {
    name: Sequelize.STRING,
    stateCode: Sequelize.STRING,
    zip: Sequelize.INTEGER,
    lat: Sequelize.DOUBLE,
    lng: Sequelize.DOUBLE,
    county: Sequelize.STRING,
    geog: Sequelize.GEOGRAPHY
  }
};
