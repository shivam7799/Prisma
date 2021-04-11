"use strict";
const db = require("../models");
const slugify = require("slugify");

const proLevelModel = db.property_level;
const proLevelsData = [{
        name: "Basement",
    },
    {
        name: "Ground Level"
    },
    {
        name: "First Floor"
    }
];

async function insertOrUpdate(item) {
    await proLevelModel.findOrCreate({
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
        for (const item of proLevelsData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("PropertyLevels", null, {});
    }
};