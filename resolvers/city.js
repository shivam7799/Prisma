const db = require("../models");
const cities = db.cities;
const states = db.states;
const countries = db.countries;

const Query = {
  cities: async () => await cities.findAll(),
  cityById: async (root, { id }) => {
    return cities.findByPk(id);
  },
  citiesByStateId: async (root, { id }) =>
    await cities.findAll({ where: [{ state_id: id }] })
};

const City = {
  state: city => states.findByPk(city.state_id)
};

const State = {
  country: state => countries.findByPk(state.country_id)
};

module.exports = { Query, City, State };
