const Sequelize = require('sequelize');


module.exports = {
  name: 'events',
  model: {
    price: {
      type: Sequelize.DECIMAL(13, 2)
    },
    date: {
      type: Sequelize.DATE
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
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
      defaultValue: ''
    }
  }
};
