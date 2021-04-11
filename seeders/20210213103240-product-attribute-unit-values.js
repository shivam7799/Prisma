"use strict";
const db = require("../models");
const slugify = require("slugify");
const product = db.product;
const attribute = db.attribute;
const attributeUnit = db.attribute_unit;
const productAttributeUnit = db.product_attribute_unit;
const productAttributeUnitValue = db.product_attribute_unit_value;

const productAttributeUnits = [{
        product_slug: "vanity_base",
        attribute_slug: "number_of_sinks",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "Single", custom: 0, custom_html_element_type: null },
            { value: "Double", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_base",
        attribute_slug: "installation_type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [
            { value: "Wall Mounted", custom: 0, custom_html_element_type: null },
            { value: "Free Standing", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_base",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 3,
        values: [
            { value: "24", custom: 0, custom_html_element_type: null },
            { value: "28", custom: 0, custom_html_element_type: null },
            { value: "30", custom: 0, custom_html_element_type: null },
            { value: "31", custom: 0, custom_html_element_type: null },
            { value: "32", custom: 0, custom_html_element_type: null },
            { value: "36", custom: 0, custom_html_element_type: null },
            { value: "37", custom: 0, custom_html_element_type: null },
            { value: "42", custom: 0, custom_html_element_type: null },
            { value: "48", custom: 0, custom_html_element_type: null },
            { value: "60", custom: 0, custom_html_element_type: null },
            { value: "72", custom: 0, custom_html_element_type: null },
            { value: "84", custom: 0, custom_html_element_type: null },
            { value: "custom", custom: 1, custom_html_element_type: "textbox" },
        ]
    },
    {
        product_slug: "vanity_base",
        attribute_slug: "depth",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 4,
        values: [
            { value: "21", custom: 0, custom_html_element_type: null },
            { value: "21.5", custom: 0, custom_html_element_type: null },
            { value: "22", custom: 0, custom_html_element_type: null },
            { value: "custom", custom: 1, custom_html_element_type: "textbox" }
        ]
    },
    {
        product_slug: "vanity_base",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "radio",
        display_order: 5,
        values: [
            { value: "33.5", custom: 0, custom_html_element_type: null },
            { value: "34", custom: 0, custom_html_element_type: null },
            { value: "custom", custom: 1, custom_html_element_type: "textbox" }
        ]
    },
    {
        product_slug: "vanity_base",
        attribute_slug: "cabinets_handles_installation",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 6,
        values: [
            { value: "Yes", custom: 0, custom_html_element_type: null },
            { value: "No", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_top",
        attribute_slug: "sink_shape",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "Rectangular", custom: 0, custom_html_element_type: null },
            { value: "Square", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_top",
        attribute_slug: "sink_installation_type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [
            { value: "Undermount", custom: 0, custom_html_element_type: null },
            { value: "Drop in", custom: 0, custom_html_element_type: null },
            { value: "Integrated", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_top",
        attribute_slug: "sink_material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 3,
        values: [
            { value: "Ceramic", custom: 0, custom_html_element_type: null },
            { value: "Porcelain", custom: 0, custom_html_element_type: null },
            { value: "Marble", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "vanity_top",
        attribute_slug: "counter_top_material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [
            { value: "Granite", custom: 0, custom_html_element_type: null },
            { value: "Quartz", custom: 0, custom_html_element_type: null },
            { value: "Marble", custom: 0, custom_html_element_type: null },
            { value: "Engineering", custom: 0, custom_html_element_type: null },
            { value: "Stone", custom: 0, custom_html_element_type: null },
            { value: "Others", custom: 1, custom_html_element_type: "textbox" }
        ]
    },
    {
        product_slug: "vanity_top",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 5,
        values: [
            { value: "Single hole", custom: 0, custom_html_element_type: null },
            { value: "Widespread", custom: 0, custom_html_element_type: null },
            { value: "Centerset", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "bathroom_vanity_lights",
        attribute_slug: "light_connections",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "None", custom: 0, custom_html_element_type: null },
            { value: "Single", custom: 0, custom_html_element_type: null },
            { value: "Two", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "bathroom_vanity_lights",
        attribute_slug: "light_switch",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [
            { value: "None", custom: 0, custom_html_element_type: null },
            { value: "1-way", custom: 0, custom_html_element_type: null },
            { value: "2-way", custom: 0, custom_html_element_type: null },
            { value: "3-way", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "mirror",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "Single", custom: 0, custom_html_element_type: null },
            { value: "Double", custom: 0, custom_html_element_type: null },
            { value: "custom", custom: 1, custom_html_element_type: "textbox" }
        ]
    },
    {
        product_slug: "toilet_base",
        attribute_slug: "mouting",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "Wall", custom: 0, custom_html_element_type: null },
            { value: "Freestanding", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "toilet_base",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [
            { value: "Single piece", custom: 0, custom_html_element_type: null },
            { value: "Two piece", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "bidet_seat",
        attribute_slug: "water_supply",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [
            { value: "Cold", custom: 0, custom_html_element_type: null },
            { value: "Hot and Cold", custom: 0, custom_html_element_type: null }
        ]
    },
    {
        product_slug: "bathroom_flooring_tiles",
        attribute_slug: "area",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{ value: null, custom: 0, custom_html_element_type: null }]
    },
    {
        product_slug: "bathroom_flooring_tiles",
        attribute_slug: "format",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [{
                value: 'Large (one edge >15")',
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: 'Medium (12" ~15")',
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Small",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "bathroom_flooring_tiles",
        attribute_slug: "material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 3,
        values: [{
                value: "Porcelain",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Ceramic",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "bathroom_flooring_tiles",
        attribute_slug: "edge",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
                value: "Metal Trim Edge",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Tile Bullnose Edge",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "bathroom_wall_tiles",
        attribute_slug: "area",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{ value: null, custom: 0, custom_html_element_type: null }]
    },
    {
        product_slug: "bathroom_wall_tiles",
        attribute_slug: "format",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [{
                value: 'Large (one edge >15")',
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: 'Medium (12" ~15")',
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Small",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "bathroom_wall_tiles",
        attribute_slug: "material",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 3,
        values: [{
                value: "Porcelain",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Ceramic",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "bathroom_wall_tiles",
        attribute_slug: "edge",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
                value: "Metal Trim Edge",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Tile Bullnose Edge",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "showers_module",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_module",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_module",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "base",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
                value: "PAN",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Mosaic Tiles",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "wall",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 5,
        values: [{
                value: "Wall Panels",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Tiles",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Glass",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 6,
        values: [{
                value: "Head",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Hand shower",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Body spray",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Jet",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "shower_door",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 7,
        values: [{
                value: "Sliding",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Hinged",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Custom",
                custom: 1,
                custom_html_element_type: "textbox"
            }
        ]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "light",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 8,
        values: [{
                value: "Recess",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Flush",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "showers_standing",
        attribute_slug: "shampoo_box",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 9,
        values: [{
            value: "Install shampoo box",
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "bathtub_free_standing",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_free_standing",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_free_standing",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_free_standing",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
            value: "Faucets",
            is_default: 1,
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "bathtub_free_standing",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 5,
        values: [{
                value: "Soaking",
                is_default: 1,
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Whirlpool",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Air bubble",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_undermount",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_undermount",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_undermount",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_undermount",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
            value: "Faucets",
            is_default: 1,
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "bathtub_undermount",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 5,
        values: [{
                value: "Soaking",
                is_default: 1,
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Whirlpool",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Air bubble",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_drop_in",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_drop_in",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_drop_in",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_drop_in",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
            value: "Faucets",
            is_default: 1,
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "bathtub_drop_in",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 5,
        values: [{
                value: "Soaking",
                is_default: 1,
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Whirlpool",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Air bubble",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "height",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "width",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 2,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "length",
        attribute_unit_slug: "inches",
        html_element_type: "textbox",
        display_order: 3,
        values: [{
            value: "Custom",
            custom: 1,
            custom_html_element_type: "textbox"
        }]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "wall",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 4,
        values: [{
                value: "Wall Panels",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Tiles",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Glass",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "faucet",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 5,
        values: [{
                value: "Head",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Hand shower",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Body spray",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Jet",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "shower_door",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 6,
        values: [{
                value: "Sliding",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Hinged",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Curtain",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "light",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 7,
        values: [{
                value: "Recess",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Flush",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "shampoo_box",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 8,
        values: [{
            value: "Install shampoo box",
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "bathtub_alcove",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 9,
        values: [{
                value: "Soaking",
                is_default: 1,
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Whirlpool",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Air bubble",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathroom_electrical_lights",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [{
                value: "Chandellier",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Recess",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Bulb",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "bathroom_electrical_lights",
        attribute_slug: "switch",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 2,
        values: [{
                value: "One way",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Two way",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "electric_outlets",
        attribute_slug: "number",
        attribute_unit_slug: "itself",
        html_element_type: "textbox",
        display_order: 1,
        values: [{
            value: null,
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "exhaust_fan",
        attribute_slug: "feature",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [{
                value: "Fan only",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Fan with light",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "frame",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [{
                value: "Double Hung",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Casement",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Awning",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "glass",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "radio",
        display_order: 1,
        values: [{
                value: "Frost",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Non-Frost",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    },
    {
        product_slug: "trimming",
        attribute_slug: "type",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 1,
        values: [{
            value: "Case Molding",
            custom: 0,
            custom_html_element_type: null
        }]
    },
    {
        product_slug: "paint",
        attribute_slug: "paint",
        attribute_unit_slug: "itself",
        html_element_type: "checkbox",
        display_order: 1,
        values: [{
                value: "Wall",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Ceiling",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Door",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Window",
                custom: 0,
                custom_html_element_type: null
            },
            {
                value: "Trim",
                custom: 0,
                custom_html_element_type: null
            }
        ]
    }
];
async function insertOrUpdate(item) {
    const productObj = await product.findOne({
        where: { slug: item.product_slug }
    });
    const attributeObj = await attribute.findOne({
        where: { slug: item.attribute_slug }
    });
    const attributeUnitObj = await attributeUnit.findOne({
        where: { slug: item.attribute_unit_slug }
    });
    if (
        productObj === null ||
        attributeObj === null ||
        attributeUnitObj === null
    ) {
        console.log("Invalid data passed...");
        console.log(item);
        return;
    }
    // console.log(products);
    // console.log(attributes);
    //console.log(attributeUnits);

    const [prodAttUnitObj] = await productAttributeUnit.findOrCreate({
        where: {
            product_id: productObj.id,
            attribute_id: attributeObj.id,
            attribute_unit_id: attributeUnitObj.id,
            html_element_type: item.html_element_type,
            display_order: item.display_order
        }
    });
    item.values.forEach(async element => {
        await productAttributeUnitValue.findOrCreate({
            where: {
                slug: element.value ? slugify(element.value, {
                    replacement: "_",
                    remove: undefined,
                    lower: true,
                    strict: true
                }) : null,
                product_attribute_unit_id: prodAttUnitObj.id,
                value: element.value
            },
            defaults: element
        });
    });
}

module.exports = {
    up: async() => {
        for (const item of productAttributeUnits) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("ProductAttributeUnitValues", null, {});
        return await queryInterface.bulkDelete("ProductAttributeUnits", null, {});
    }
};