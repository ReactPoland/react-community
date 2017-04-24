const Sequelize = require('sequelize');

module.exports = {
  name: 'states',
  model: {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    stateCode: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
};
