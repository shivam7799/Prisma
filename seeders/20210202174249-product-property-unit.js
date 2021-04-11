"use strict";
const db = require("../models");
const productModel = db.product;
const propertyUnitModel = db.property_unit;
const productPropertyUnitModel = db.product_property_unit;

const productPropertyUnits = [{
        product_slug: "vanity_base",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "vanity_top",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathroom_vanity_lights",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bidet_seat",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathroom_flooring_tiles",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "mirror",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "toilet_base",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathroom_wall_tiles",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "showers_module",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "showers_standing",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathtub_free_standing",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathtub_undermount",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathtub_drop_in",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathtub_alcove",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "electric_outlets",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "exhaust_fan",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "bathroom_electrical_lights",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "frame",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "glass",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "trimming",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "paint",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "framing",
        property_unit_slug: "bathroom"
    },
    {
        product_slug: "drywall",
        property_unit_slug: "bathroom"
    }
];

async function insertOrUpdate(item) {
    const productModelObj = await productModel.findOne({
        where: { slug: item.product_slug }
    });

    const propertyUnitModelObj = await propertyUnitModel.findOne({
        where: { slug: item.property_unit_slug }
    });

    if (productModelObj === null || propertyUnitModelObj === null) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }

    await productPropertyUnitModel.findOrCreate({
        where: {
            product_id: productModelObj.id,
            property_unit_id: propertyUnitModelObj.id
        }
    });
}

module.exports = {
    up: async() => {
        for (const item of productPropertyUnits) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("ProductPropertyUnits", null, {});
    }
};