const Sequelize = require('sequelize');

module.exports = {
  name: 'locations',
  model: {
    criteria_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    canonical_name: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
    country_code: Sequelize.STRING,
    target_type: Sequelize.STRING,
    status: Sequelize.STRING,
  },
  aditional: {
    timestamps: false  
  }
};
