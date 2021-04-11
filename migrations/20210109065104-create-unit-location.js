"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "UnitLocations",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        property_sub_type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "PropertySubTypes",
            key: "id",
          },
          allowNull: false,
          unique: "property_level_subtype_unit_slug",
        },
        property_level_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "PropertyLevels",
            key: "id",
          },
          allowNull: false,
          unique: "property_level_subtype_unit_slug",
        },
        property_unit_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "PropertyUnits",
            key: "id",
          },
          allowNull: false,
          unique: "property_level_subtype_unit_slug",
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
      },
      {
        uniqueKeys: {
          product_property_unit_slug: {
            fields: [
              "property_level_id",
              "property_unit_id",
              "property_sub_type_id",
            ],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UnitLocations");
  },
};
