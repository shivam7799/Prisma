"use strict";
const db = require("../models");
const propertyUnit = db.property_unit;
const attribute = db.attribute;
const attributeUnit = db.attribute_unit;
const propertyUnitAttribute = db.property_unit_attribute;


const propertyUniteAttributes = [{
        property_unit_slug: "bathroom",
        attribute_slug: "number_of_sinks",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "installation_type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 3
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "depth",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 4
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 5
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "cabinets_handles_installation",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 6
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "sink_shape",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 7
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "sink_installation_type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 8
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "sink_material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 9
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "counter_top_material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 10
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 11
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "light_connections",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 12
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "light_switch",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 13
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 14
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "mouting",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 15
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "water_supply",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 16
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "area",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 17
    },
    {
        property_unit_slug: "bathroom",
        attribute_slug: "format",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 18
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 19
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "edge",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 20
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 21
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "base",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 22
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "wall",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 23
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "shower_door",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 24
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "light",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 25
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "shampoo_box",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 26
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 27
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "switch",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 28
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "number",
        attribute_unit_slug: "itself",
        html_element_type: "textbox",
        display_order: 29
    }, {
        property_unit_slug: "bathroom",
        attribute_slug: "paint",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 30
    }
];

async function insertOrUpdate(item) {
    const propertyUnitObj = await propertyUnit.findOne({
        where: { slug: item.property_unit_slug }
    });

    const attributeObj = await attribute.findOne({
        where: { slug: item.attribute_slug }
    });

    const attributeUnitObj = await attributeUnit.findOne({
        where: { slug: item.attribute_unit_slug }
    });
    if (propertyUnitObj === null || attributeObj === null || attributeUnitObj === null) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }
    await propertyUnitAttribute.findOrCreate({
        where: {
            property_unit_id: propertyUnitObj.id,
            attribute_id: attributeObj.id,
            attribute_unit_id: attributeUnitObj.id,
            html_element_type: item.html_element_type,
            display_order: item.display_order
        },
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of propertyUniteAttributes) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("PropertyUnitAttributes", null, {});
    }
};