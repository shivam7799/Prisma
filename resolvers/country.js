const db = require("../models");
const country = db.countries;

const Query = {
  countries: async () => await country.findAll(),
  countryById: async (root, { id }) => {
    return country.findByPk(id);
  }
};

module.exports = { Query };
