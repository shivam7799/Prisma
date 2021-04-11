const db = require("../models");
const states = db.states;
const countries = db.countries;

const Query = {
  states: async () => await states.findAll(),
  stateById: async (root, { id }) => {
    return states.findByPk(id);
  },
  statesByCountryId: async (root, { id }) =>
    await states.findAll({ where: [{ country_id: id }] })
};

const State = {
  country: state => countries.findByPk(state.country_id)
};

module.exports = { Query, State };
