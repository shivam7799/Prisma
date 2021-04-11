const db = require("../models");
const attribute = db.attribute;

const Query = {
  attributes: async () => await attribute.findAll(),
  attributeById: async (root, { id }) => {
    return attribute.findByPk(id);
  }
};

module.exports = { Query };
