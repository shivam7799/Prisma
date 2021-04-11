const db = require("../models");
const product = db.product;

const Query = {
  products: async () => await product.findAll(),
  productById: async (root, { id }) => {
    return product.findByPk(id);
  }
};

module.exports = { Query };
