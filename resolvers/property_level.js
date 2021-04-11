const db = require("../models");
const propertyLevel = db.property_level;

const Query = {
  property_levels: async () => await propertyLevel.findAll(),
  property_levelById: async (root, { id }) => {
    return propertyLevel.findByPk(id);
  }
};

module.exports = { Query };
