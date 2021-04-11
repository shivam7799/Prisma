const db = require("../models");
const propertyUnitAttribute = db.property_unit_attribute;

const Query = {
  property_unit_attributes: async () => await propertyUnitAttribute.findAll(),
  property_unit_attributeById: async (root, { id }) => {
    return propertyUnitAttribute.findByPk(id);
  }
};

module.exports = { Query };
