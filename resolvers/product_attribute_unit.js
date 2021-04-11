const db = require("../models");
const productAttributeUnit = db.product_attribute_unit;
const attribute = db.attribute;
const product = db.product;
const attributeUnit = db.attribute_unit;

const Query = {
  product_attribute_units: async () => await productAttributeUnit.findAll(),
  product_attribute_unitById: async (root, { id }) => {
    return productAttributeUnit.findByPk(id);
  }
};

const Product_Attribute_Unit = {
  attribute: property_attribute_unit =>
    attribute.findByPk(property_attribute_unit.attribute_id),
  product: property_attribute_unit =>
    product.findByPk(property_attribute_unit.product_id),
  attribute_unit: property_attribute_unit =>
    attributeUnit.findByPk(property_attribute_unit.attribute_unit_id)
};

module.exports = { Query, Product_Attribute_Unit };
