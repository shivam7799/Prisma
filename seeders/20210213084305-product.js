"use strict";
const slugify = require("slugify");
const db = require("../models");
const product = db.product;
const products = [
    { name: "Vanity Base" },
    { name: "Vanity Top" },
    { name: "Bathroom Vanity Lights" },
    { name: "Mirror" },
    { name: "Toilet Base" },
    { name: "Bidet seat" },
    { name: "Bathroom Flooring Tiles" },
    { name: "Bathroom Wall Tiles" },
    { name: "Showers (Module)" },
    { name: "Showers (Standing)" },
    { name: "Bathtub (Free Standing)" },
    { name: "Bathtub (Undermount)" },
    { name: "Bathtub (Drop in)" },
    { name: "Bathtub (Alcove)" },
    { name: "Bathroom Electrical Lights" },
    { name: "Electric Outlets" },
    { name: "Exhaust Fan" },
    { name: "Frame" },
    { name: "Glass" },
    { name: "Trimming" },
    { name: "Paint" },
    { name: "Framing" },
    { name: "Drywall" }
];

async function insertOrUpdate(item) {
    await product.findOrCreate({
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
        for (const item of products) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Products", null, {});
    }
};