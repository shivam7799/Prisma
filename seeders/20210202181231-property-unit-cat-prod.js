"use strict";
const db = require("../models");
const product = db.product;
const propertyUnit = db.property_unit;
const productCategory = db.product_category;
const propertyUnitProductCategory = db.property_unit_product_category;
const propertyUnitProductCategoryProduct =
    db.property_unit_product_category_product;

const propertyUnitProductCategoryProducts = [{
        property_unit_slug: "bathroom",
        product_category_slug: "vanity",
        product_slug: "vanity_base",
        display_order: 1
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "vanity",
        product_slug: "vanity_top",
        display_order: 2
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "vanity",
        product_slug: "bathroom_vanity_lights",
        display_order: 3
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "vanity",
        product_slug: "mirror",
        display_order: 4
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "toilet",
        product_slug: "toilet_base",
        display_order: 5
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "toilet",
        product_slug: "bidet_seat",
        display_order: 6
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "flooring",
        product_slug: "bathroom_flooring_tiles",
        display_order: 7
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "wall",
        product_slug: "bathroom_wall_tiles",
        display_order: 8
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "showers_module",
        display_order: 9
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "showers_standing",
        display_order: 10
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "bathtub_free_standing",
        display_order: 11
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "bathtub_undermount",
        display_order: 12
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "bathtub_drop_in",
        display_order: 13
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "showers",
        product_slug: "bathtub_alcove",
        display_order: 14
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "electrical",
        product_slug: "bathroom_electrical_lights",
        display_order: 15
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "electrical",
        product_slug: "electric_outlets",
        display_order: 16
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "electrical",
        product_slug: "exhaust_fan",
        display_order: 17
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "new_window",
        product_slug: "frame",
        display_order: 18
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "new_window",
        product_slug: "glass",
        display_order: 19
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "new_window",
        product_slug: "trimming",
        display_order: 20
    },
    {
        property_unit_slug: "bathroom",
        product_category_slug: "paint",
        product_slug: "paint",
        display_order: 21
    },
];

async function insertOrUpdate(item) {
    const propertyUnitObj = await propertyUnit.findOne({
        where: { slug: item.property_unit_slug }
    });

    const productCategoryObj = await productCategory.findOne({
        where: { slug: item.product_category_slug }
    });

    const productObj = await product.findOne({
        where: { slug: item.product_slug }
    });

    const propertyUnitProductCategoryObj = await propertyUnitProductCategory.findOne({
        where: {
            product_category_id: productCategoryObj.id,
            property_unit_id: propertyUnitObj.id
        }
    });
    // console.log(propertyUnitProductCategoryObj);

    if (propertyUnitObj === null || productCategoryObj === null || productObj === null || productCategoryObj === null) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }

    await propertyUnitProductCategoryProduct.findOrCreate({
        where: {
            product_id: productObj.id,
            property_unit_product_category_id: propertyUnitProductCategoryObj.id,
            display_order: item.display_order
        }
    });
}

module.exports = {
    up: async() => {
        for (const item of propertyUnitProductCategoryProducts) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            "PropertyUnitProductCategoryProducts",
            null, {}
        );
    }
};