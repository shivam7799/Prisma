const db = require("../models");
const attributeValue = db.attribute_unit;

const Query = {
  attribute_units: async () => await attributeValue.findAll(),
  attribute_unitById: async (root, { id }) => {
    return attributeValue.findByPk(id);
  }
};

module.exports = { Query };
