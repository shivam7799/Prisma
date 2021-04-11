const db = require("../models");
const productPropertyUnit = db.product_property_unit;

const Query = {
  product_property_units: async () => await productPropertyUnit.findAll(),
  product_property_unitById: async (root, { id }) => {
    return productPropertyUnit.findByPk(id);
  }
};

module.exports = { Query };
