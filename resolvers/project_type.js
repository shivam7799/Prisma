const db = require("../models");
const projectType = db.project_type;

const Query = {
  project_types: async () => await projectType.findAll(),
  project_typeById: async (root, { id }) => {
    return projectType.findByPk(id);
  }
};

module.exports = { Query };
