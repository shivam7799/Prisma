"use strict";
const users = require("./20210102145910-user");
const countries = require("./20210202160459-countries");
const states = require("./20210202161107-states");
const cities = require("./20210202162013-cities");
const projectTypes = require("./20210202162436-project-types");
const propertyLevels = require("./20210202162633-property-levels");
const propertyTypes = require("./20210202165408-property-types");
const propertySubTypes = require("./20210202165409-property-sub-types");
const productCategories = require("./20210213084159-product-categories");
const propertyUnits = require("./20210213084200-property-units");
const attributes = require("./20210213094437-attributes");
const products = require("./20210213084305-product");
const attributeUnits = require("./20210213101700-attribute-units");
const productAttributeUnits = require("./20210213103240-product-attribute-unit-values");
const productPropertyUnits = require("./20210202174249-product-property-unit");
const propertyUnitProductCategories = require("./20210202180905-property-unit-prod-cat");
const propertyUnitProductCategoryProducts = require("./20210202181231-property-unit-cat-prod");
const propertyUnitAttributes = require("./20210226113836-property-unit-attributes");
const unitLocations = require("./20210226130226-unit-locations");

module.exports = {
    up: async() => {
        await users.up();
        await countries.up();
        await states.up();
        await cities.up();
        await projectTypes.up();
        await propertyLevels.up();
        await propertyTypes.up();
        await propertySubTypes.up();
        await productCategories.up();
        await propertyUnits.up();
        await attributes.up();
        await products.up();
        await attributeUnits.up();
        await propertyUnitAttributes.up();
        await unitLocations.up();
        await productAttributeUnits.up();
        await productPropertyUnits.up();
        await propertyUnitProductCategories.up();
        await propertyUnitProductCategoryProducts.up();
        return;
    },

    down: async queryInterface => {
        await unitLocations.down(queryInterface);
        await productAttributeUnits.down(queryInterface);
        await propertyUnitProductCategoryProducts.down(queryInterface);
        await propertyUnitProductCategories.down(queryInterface);
        await productPropertyUnits.down(queryInterface);
        await propertyUnitAttributes.down(queryInterface);
        await attributeUnits.down(queryInterface);
        await products.down(queryInterface);
        await attributes.down(queryInterface);
        await propertyUnits.down(queryInterface);
        await productCategories.down(queryInterface);
        await projectTypes.down(queryInterface);
        await propertyLevels.down(queryInterface);
        await propertySubTypes.down(queryInterface);
        await propertyTypes.down(queryInterface);
        await cities.down(queryInterface);
        await states.down(queryInterface);
        await countries.down(queryInterface);
        await users.down(queryInterface);
    }
};