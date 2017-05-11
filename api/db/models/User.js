const Sequelize = require('sequelize');

module.exports = {
  name: 'users',
  model: {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pictureURL: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ghID: {
      type: Sequelize.INTEGER
    },
    filledProfile: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM,
      defaultValue: 'user',
      values: ['user', 'staff']
    }
  }
};
