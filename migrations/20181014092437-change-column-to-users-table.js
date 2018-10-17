'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn(
      'users',
      'open_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ).then(queryInterface.changeColumn(
      'users',
      'session_key',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )).then(queryInterface.changeColumn(
      'users',
      'nick_name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.changeColumn(
      'users',
      'open_id',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    ).then(queryInterface.changeColumn(
      'users',
      'session_key',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )).then(queryInterface.changeColumn(
      'users',
      'nick_name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ));
  }
};
