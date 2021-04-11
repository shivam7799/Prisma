"use strict";
const db = require("../models");
const slugify = require("slugify");

const projectTypeModel = db.project_type;
const proTypesData = [{
        type: "Remodeling",
    },
    {
        type: "New"
    }
];

async function insertOrUpdate(item) {
    await projectTypeModel.findOrCreate({
        where: {
            slug: slugify(item.type, {
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
        return queryInterface.bulkDelete("ProjectTypes", null, {});
    }
};