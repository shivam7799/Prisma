"use strict";
const db = require("../models");
const slugify = require("slugify");
const propertyUnit = db.property_unit;
const propertyUnits = [{
        name: "Kitchen"
    },
    {
        name: "Bedroom"
    },
    {
        name: "Washroom"
    },
    {
        name: "Bathroom"
    }
];

async function insertOrUpdate(item) {
    await propertyUnit.findOrCreate({
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
    up: async() => {
        for (const item of propertyUnits) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("PropertyUnits", null, {});
    }
};