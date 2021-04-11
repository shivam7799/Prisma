const db = require("../models");
const projectTypeAssociation = db.project_type_association;

const Query = {
  projectTypeAssociationByProjectId: async (root, { id }) =>
    await projectTypeAssociation.findAll({
      where: [{ project_id: id }]
    })
};

module.exports = { Query };
