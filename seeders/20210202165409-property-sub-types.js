"use strict";
const db = require("../models");
const slugify = require("slugify");
const proTypeModel = db.property_type;
const proSubTypeModel = db.property_sub_type;

const proSubTypesData = [{
    name: "Canonical",
    property_type: "single_family",
}];

async function insertOrUpdate(item) {
    const proTypeObj = await proTypeModel.findOne({
        where: {
            slug: item.property_type
        }
    });
    if (proTypeObj === null) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }
    await proSubTypeModel.findOrCreate({
        where: {
            slug: slugify(item.name, {
                replacement: "_",
                remove: undefined,
                lower: true,
                strict: true
            }),
            property_type_id: proTypeObj.id
        },
        defaults: { name: item.name }
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of proSubTypesData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("PropertySubTypes", null, {});
    }
};