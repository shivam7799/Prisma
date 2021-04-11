"use strict";
const db = require("../models");
const propertyUnitModel = db.property_unit;
const productCategoryModel = db.product_category;
const propertyUnitProductCategoryModel = db.property_unit_product_category;

const propertyUnitProductCategories = [{
        product_category_slug: "toilet",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "vanity",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "flooring",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "wall",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "electrical",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "new_window",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "paint",
        property_unit_slug: "bathroom"
    },
    {
        product_category_slug: "showers",
        property_unit_slug: "bathroom"
    }
];

async function insertOrUpdate(item) {
    const productCategoryModelObj = await productCategoryModel.findOne({
        where: { slug: item.product_category_slug }
    });

    const propertyUnitModelObj = await propertyUnitModel.findOne({
        where: { slug: item.property_unit_slug }
    });

    if (productCategoryModelObj === null || propertyUnitModelObj === null) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }

    await propertyUnitProductCategoryModel.findOrCreate({
        where: {
            product_category_id: productCategoryModelObj.id,
            property_unit_id: propertyUnitModelObj.id
        }
    });
}

module.exports = {
    up: async() => {
        for (const item of propertyUnitProductCategories) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("PropertyUnitProductCategories", null, {});
    }
};