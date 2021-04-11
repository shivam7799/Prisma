"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AreaOfWorks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_proposal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProjectProposals",
          key: "id"
        },
        allowNull: false
      },
      unit_location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "UnitLocations",
          key: "id"
        },
        allowNull: false
      },
      new_unit: {
        type: Sequelize.STRING
      },
      existing_unit: {
        type: Sequelize.STRING
      },
      unit_alias: {
        type: Sequelize.STRING
      },
      work_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      updated_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AreaOfWorks");
  }
};
