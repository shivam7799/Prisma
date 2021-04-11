"use strict";
const db = require("../models");
const countryModel = db.countries;
const countriesData = [{
        country_name: "United States",
        country_code: "US",
        iso3: "USA",
        phone_code: "1"
    },
    {
        country_name: "Canada",
        country_code: "CA",
        iso3: "CAN",
        phone_code: "1"
    }
];

async function insertOrUpdate(item) {
    await countryModel.findOrCreate({
        where: {
            country_code: item.country_code
        },
        defaults: item
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of countriesData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Countries", null, {});
    }
};