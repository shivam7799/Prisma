"use strict";
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("ProductAttributeUnitValues", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            value: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING,
                unique: 'product_attribute_unit_id_slug'
            },
            product_attribute_unit_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "ProductAttributeUnits",
                    key: "id"
                },
                allowNull: false,
                unique: 'product_attribute_unit_id_slug'
            },
            custom: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            custom_html_element_type: {
                allowNull: true,
                type: Sequelize.STRING
            },
            is_default: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
                product_attribute_unit_id_slug: {
                    fields: ['product_attribute_unit_id', 'slug']
                }
            }
        })
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("ProductAttributeUnitValues");
    }
};