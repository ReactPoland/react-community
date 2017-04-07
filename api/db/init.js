const Sequelize = require('sequelize');
const config = require('./config');

if (!(config && config.database)) {
  throw new Error('config file not found');
}

const dbConf = config.database;

const sequelize = new Sequelize(dbConf.url, {
  pool: {
    max: 4,
    min: 0,
    idle: 10000
  },
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('db authenticate successfull');
  });

module.exports = sequelize;
