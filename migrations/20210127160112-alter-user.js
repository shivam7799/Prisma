"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "username", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "email_verified", {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("Users", "name", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "username"),
      queryInterface.removeColumn("Users", "email_verified"),
      queryInterface.removeColumn("Users", "name"),
    ]);
  },
};
