"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Property_Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
      },
      property_owner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertyOwners",
          key: "id",
        },
        allowNull: false,
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
        allowNull: false,
      },
      property_sub_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertySubTypes",
          key: "id",
        },
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      construction_type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      withBasement: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      storyId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Property_Addresses");
  },
};
