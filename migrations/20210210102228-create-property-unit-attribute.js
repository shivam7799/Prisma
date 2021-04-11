"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PropertyUnitAttributes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      property_unit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertyUnits",
          key: "id",
        },
        allowNull: false,
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Attributes",
          key: "id",
        },
        allowNull: false,
      },
      attribute_unit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "AttributeUnits",
          key: "id",
        },
        allowNull: false,
      },
      html_element_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("PropertyUnitAttributes");
  },
};
