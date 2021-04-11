"use strict";
const db = require("../models");
const countryModel = db.countries;
const stateModel = db.states;
const cityModel = db.cities;

const citiesData = [{
        name: "Birmingham",
        country_code: "US",
        state_code: "AL"
    },
    {
        name: "Anchorage",
        country_code: "US",
        state_code: "AK"
    }
];

async function insertOrUpdate(item) {
    const countryObj = await countryModel.findOne({
        where: {
            country_code: item.country_code
        }
    });
    if (countryObj === null) {
        console.log("Invalid country code passed...");
        console.log(item);
        return;
    }
    const stateObj = await stateModel.findOne({
        where: {
            country_id: countryObj.id,
            state_code: item.state_code
        }
    });
    if (stateObj === null) {
        console.log("Invalid state code passed...");
        console.log(item);
        return;
    }
    await cityModel.findOrCreate({
        where: {
            state_id: stateObj.id,
            name: item.name
        }
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of citiesData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Cities", null, {});
    }
};