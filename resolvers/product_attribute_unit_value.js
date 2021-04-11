const db = require("../models");
const productAttributeUnitValues = db.product_attribute_unit_value;
const productAttributeUnit = db.product_attribute_unit;

const Query = {
  product_attribute_unit_values: async () =>
    await productAttributeUnitValues.findAll(),
  product_attribute_unit_valueById: async (root, args, context, info) => {
    return productAttributeUnitValues.findByPk(args.id);
  }
};

const Product_Attribute_Unit_Value = {
  product_attribute_unit: product_attribute_unit_value =>
    productAttributeUnit.findByPk(
      product_attribute_unit_value.product_attribute_unit_id
    )
};

module.exports = { Query, Product_Attribute_Unit_Value };
