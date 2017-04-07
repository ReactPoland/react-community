const Sequelize = require('sequelize');

module.exports = {
  name: 'users',
  model: {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pictureURL: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ghID: {
      type: Sequelize.INTEGER
    }
  }
};
