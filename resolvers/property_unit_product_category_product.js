const db = require("../models");
const propertyUnitProductCategoryProduct =
  db.property_unit_product_category_product;

const Query = {
  property_unit_product_category_products: async () =>
    await propertyUnitProductCategoryProduct.findAll(),
  property_unit_product_category_productById: async (root, { id }) => {
    return propertyUnitProductCategoryProduct.findByPk(id);
  }
};

module.exports = { Query };
