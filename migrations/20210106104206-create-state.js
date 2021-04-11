"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("States", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id"
        },
        allowNull: false,
        unique: 'country_id_state_code'
      },
      name: {
        type: Sequelize.STRING
      },
      state_code: {
        type: Sequelize.STRING(3),
        allowNull: false,
        comment: "State Abbreviation",
        unique: 'country_id_state_code'
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
        comment: "0 - Inactive, 1 - Active"
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
    }, {
        uniqueKeys: {
            country_id_state_code: {
                fields: ['country_id', 'state_code']
            }
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("States");
  }
};
