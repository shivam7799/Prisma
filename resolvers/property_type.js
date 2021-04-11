const db = require("../models");
const propertyType = db.property_type;

const Query = {
  property_types: async () => await propertyType.findAll(),
  property_typeById: async (root, { id }) => {
    return propertyType.findByPk(id);
  }
};

module.exports = { Query };
