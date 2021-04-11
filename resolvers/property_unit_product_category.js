const db = require("../models");
const propertyUnitProductCategory = db.property_unit_product_category;

const Query = {
  property_unit_product_categories: async () =>
    await propertyUnitProductCategory.findAll(),
  property_unit_product_categoryById: async (root, { id }) => {
    return propertyUnitProductCategory.findByPk(id);
  }
};

module.exports = { Query };
