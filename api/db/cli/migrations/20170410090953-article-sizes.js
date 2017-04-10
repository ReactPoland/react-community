module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'articles',
      'previewSize',
      {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: false,
        defaultValue: [1, 1]
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
    return queryInterface.removeColumn('articles', 'previewSize')

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
