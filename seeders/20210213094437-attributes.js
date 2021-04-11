"use strict";
const slugify = require("slugify");
const db = require("../models");
const attribute = db.attribute;
const attributes = [
    { name: "Number of Sinks" },
    { name: "Installation Type" },
    { name: "Width" },
    { name: "Depth" },
    { name: "Height" },
    { name: "Cabinets Handles Installation" },
    { name: "Sink Shape" },
    { name: "Sink Installation Type" },
    { name: "Sink Material" },
    { name: "Counter Top Material" },
    { name: "Faucet" },
    { name: "Light Connections" },
    { name: "Light Switch" },
    { name: "Type" },
    { name: "Mouting" },
    { name: "Water supply" },
    { name: "Area" },
    { name: "Format" },
    { name: "Material" },
    { name: "Edge" },
    { name: "Length" },
    { name: "Base" },
    { name: "Wall" },
    { name: "Shower Door" },
    { name: "Light" },
    { name: "Shampoo Box" },
    { name: "Feature" },
    { name: "Switch" },
    { name: "Number" },
    { name: "Paint" },
    { name: "Size" }
];

async function insertOrUpdate(item) {
    await attribute.findOrCreate({
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
        for (const item of attributes) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Attributes", null, {});
    }
};