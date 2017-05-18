const Sequelize = require('sequelize');
const config = require('../config').default;

if (!(config && config.dbConfig)) {
  throw new Error('config file not found');
}

const sequelize = new Sequelize(config.dbConfig.url, {
  pool: {
    max: 4,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('db authenticate successfull');
  });

module.exports = sequelize;
