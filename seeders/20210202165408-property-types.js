"use strict";
const db = require("../models");
const slugify = require("slugify");
const proTypeModel = db.property_type;

const proTypesData = [{
    name: "Single Family",
}];

async function insertOrUpdate(item) {
    await proTypeModel.findOrCreate({
        where: {
            slug: slugify(item.name, {
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
        for (const item of proTypesData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Property_Types", null, {});
    }
};