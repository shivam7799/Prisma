"use strict";
const db = require("../models");
const slugify = require("slugify");
const productCategory = db.product_category;
const categories = [{
        name: "Vanity"
    },
    {
        name: "Toilet"
    },
    {
        name: "Flooring"
    },
    {
        name: "Wall"
    },
    {
        name: "Showers"
    },
    {
        name: "Electrical"
    },
    {
        name: "New Window"
    },
    {
        name: "Paint"
    }
];

async function insertOrUpdate(item) {
    await productCategory.findOrCreate({
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
        for (const item of categories) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ProductCategories", null, {});
    }
};