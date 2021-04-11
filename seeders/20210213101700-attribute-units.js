"use strict";
const db = require("../models");
const slugify = require("slugify");
const attributeUnit = db.attribute_unit;
const attributeUnits = [{ unit_name: "Itself" }, { unit_name: "Inches" }];

async function insertOrUpdate(item) {
    await attributeUnit.findOrCreate({
        where: {
            slug: slugify(item.unit_name, {
                replacement: "_",
                remove: undefined,
                lower: true,
                strict: true
            })
        },
        defaults: item
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of attributeUnits) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("AttributeUnits", null, {});
    }
};