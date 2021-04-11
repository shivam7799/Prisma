"use strict";
const db = require("../models");
const countryModel = db.countries;
const stateModel = db.states;
const statesData = [{
        name: "Alabama",
        state_code: "AL",
        country_code: "US"
    },
    {
        name: "Alaska",
        state_code: "AK",
        country_code: "US"
    },
    {
        name: "California",
        state_code: "CA",
        country_code: "US"
    },
    {
        name: "Florida",
        state_code: "FL",
        country_code: "US"
    },
    {
        name: "Alberta",
        state_code: "AB",
        country_code: "CA"
    },
    {
        name: "British Columbia",
        state_code: "BC",
        country_code: "CA"
    },
    {
        name: "Manitoba",
        state_code: "MB",
        country_code: "CA"
    },
    {
        name: "New Brunswick",
        state_code: "NB",
        country_code: "CA"
    },
    {
        name: "Newfoundland",
        state_code: "NF",
        country_code: "CA"
    },
    {
        name: "Northwest Territories",
        state_code: "NT",
        country_code: "CA"
    },
    {
        name: "Nova Scotia",
        state_code: "NS",
        country_code: "CA"
    },
    {
        name: "Nunavut",
        state_code: "NU",
        country_code: "CA"
    },
    {
        name: "Ontario",
        state_code: "ON",
        country_code: "CA"
    },
    {
        name: "Prince Edward Island",
        state_code: "PE",
        country_code: "CA"
    },
    {
        name: "Quebec",
        state_code: "PQ",
        country_code: "CA"
    },
    {
        name: "Saskatchewan",
        state_code: "SK",
        country_code: "CA"
    },
    {
        name: "Yukon",
        state_code: "YT",
        country_code: "CA"
    }
];

async function insertOrUpdate(item) {
    const countryObj = await countryModel.findOne({
        where: {
            country_code: item.country_code
        }
    });
    if (countryObj === null) {
        console.log(item);
        console.log("Country does not exist..............");
        return;
    }
    await stateModel.findOrCreate({
        where: {
            country_id: countryObj.id,
            state_code: item.state_code
        },
        defaults: { name: item.name }
    });
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of statesData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("States", null, {});
    }
};