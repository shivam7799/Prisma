"use strict";
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("ProductPropertyUnits", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            property_unit_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "PropertyUnits",
                    key: "id"
                },
                allowNull: false,
                unique: "product_property_unit_slug"
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Products",
                    key: "id"
                },
                allowNull: false,
                unique: "product_property_unit_slug"
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
                product_property_unit_slug: {
                    fields: ['product_id', 'property_unit_id']
                }
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("ProductPropertyUnits");
    }
};