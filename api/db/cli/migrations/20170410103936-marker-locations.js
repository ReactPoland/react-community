module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'markers',
      'googleLocationId',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      }
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('markers', 'googleLocationId')

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
