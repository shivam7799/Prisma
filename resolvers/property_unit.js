const db = require("../models");
const propertyUnit = db.property_unit;

const Query = {
  property_units: async () => await propertyUnit.findAll(),
  property_unitById: async (root, { id }) => {
    return propertyUnit.findByPk(id);
  }
};

module.exports = { Query };
