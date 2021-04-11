const db = require("../models");
const productCategory = db.product_category;

const Query = {
  product_categories: async () => await productCategory.findAll(),
  product_categoryById: async (root, { id }) => {
    return productCategory.findByPk(id);
  }
};

module.exports = { Query };
