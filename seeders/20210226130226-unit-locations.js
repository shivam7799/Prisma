"use strict";
const db = require("../models");
const propertyUnit = db.property_unit;
const propertySubType = db.property_sub_type;
const propertyLevel = db.property_level;
const unitLocation = db.unit_location;

const unitLocations = [
  {
    property_unit_slug: "bathroom",
    property_sub_type_slug: "canonical",
    property_level_slug: "basement",
  },
  {
    property_unit_slug: "bathroom",
    property_sub_type_slug: "canonical",
    property_level_slug: "first_floor",
  },
  {
    property_unit_slug: "bathroom",
    property_sub_type_slug: "canonical",
    property_level_slug: "ground_level",
  },
];

async function insertOrUpdate(item) {
  const propertyUnitObj = await propertyUnit.findOne({
    where: { slug: item.property_unit_slug },
  });

  const propertySubTypeObj = await propertySubType.findOne({
    where: { slug: item.property_sub_type_slug },
  });

  const propertyLevelObj = await propertyLevel.findOne({
    where: { slug: item.property_level_slug },
  });
  if (
    propertyUnitObj === null ||
    propertySubTypeObj === null ||
    propertyLevelObj === null
  ) {
    console.log("Invalid data passed...");
    console.log(item);
    return;
  }
  await unitLocation.findOrCreate({
    where: {
      property_unit_id: propertyUnitObj.id,
      property_sub_type_id: propertySubTypeObj.id,
      property_level_id: propertyLevelObj.id,
    },
  });
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const item of unitLocations) {
      await insertOrUpdate(item);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UnitLocations", null, {});
  },
};
