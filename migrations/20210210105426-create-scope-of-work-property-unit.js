"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ScopeOfWorkPropertyUnits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_proposal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProjectProposals",
          key: "id",
        },
        allowNull: false,
      },
      area_of_work_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "AreaOfWorks",
          key: "id",
        },
        allowNull: false,
      },
      property_unit_attribute_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertyUnitAttributes",
          key: "id",
        },
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attribute_custom_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attribute_custom_value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attribute_custom_unit: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("ScopeOfWorkPropertyUnits");
  },
};
