const db = require("../models");
const project = db.project;
const propertyAddress = db.property_address;
const projectTypeAssociation = db.project_type_association;
const projectProposal = db.project_proposal;
const areaOfWork = db.area_of_work;

const Query = {
  projects: async () => await project.findAll(),
  projectById: async (root, { id }) => {
    return project.findByPk(id);
  },
  projectByPropertyAddressId: async (root, { id }) => {
    return await project.findAll({ where: [{ property_address_id: id }] });
  },
};

const Mutation = {
  createProject: async (root, args, context, info) => {
    const {
      property_address_id,
      name,
      created_by,
      start_date,
      project_types,
    } = args;

    const projectObj = await project.create({
      property_address_id,
      name,
      created_by,
      start_date,
    });

    await createAssociation(project_types, projectObj);

    await createProposal(projectObj);

    return projectObj;
  },
  updateProject: async (root, args, context, info) => {
    const {
      id,
      property_address_id,
      name,
      updated_by,
      start_date,
      project_types,
    } = args;
    const projectObj = await project.findByPk(id);
    if (!projectObj) {
      throw new Error(`Couldn’t find Project with id ${id}`);
    }

    (await projectObj).update({
      property_address_id,
      name,
      updated_by,
      start_date,
    });

    await destroyAssociations(id);
    await createAssociation(project_types, projectObj);
    await destroyProposal(id);
    await createProposal(projectObj);

    return projectObj;
  },
  deleteProject: async (root, args, context, info) => {
    const { id } = args;
    const projectObj = project.findByPk(id);

    if (!projectObj) {
      throw new Error(`Couldn’t find Project with id ${id}`);
    }

    const projectProposalObjs = projectProposal.findAll({
      where: {
        project_id: id,
      },
    });
    if (projectProposalObjs) {
      (await projectProposalObjs).forEach(async (projectProposalObj) => {
        (await projectProposalObj).destroy();
      });
    }

    await destroyAssociations(id);
    await destroyProposal(id);

    (await projectObj).destroy();

    return "Project deleted successfully";
  },
};

const Project = {
  property_address: (project) =>
    propertyAddress.findByPk(project.property_address_id),
  project_types: async (project) => {
    return await projectTypeAssociation.findAll({
      where: {
        project_id: project.id,
      },
    });
  },
  project_proposal: async (project) => {
    return await projectProposal.findAll({
      where: {
        project_id: project.id,
      },
    });
  },
  areaOfWork: async (project) => {
    return new Promise((resolve, reject) => {
      var query =
        "SELECT aow.id FROM ProjectProposals AS pp JOIN AreaOfWorks AS aow ON aow.project_proposal_id = pp.id WHERE pp.project_id = " +
        project.id;
      db.pool.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log("Ran areaofwork query: " + query);
        return resolve(results);
      });
    });
  },
};

async function createAssociation(project_types, projectObj) {
  project_types.forEach(async (element) => {
    return await projectTypeAssociation.create({
      project_id: projectObj.id,
      project_type_id: element.id,
      created_by: projectObj.created_by,
    });
  });
}

async function createProposal(projectObj) {
  return await projectProposal.create({
    name: projectObj.name,
    project_id: projectObj.id,
    created_by: projectObj.created_by,
    proposal_status: projectProposal.STATUS_PENDING,
  });
}

async function destroyProposal(id) {
  const projectProposalObjs = projectProposal.findAll({
    where: {
      project_id: id,
    },
  });
  if (projectProposalObjs) {
    (await projectProposalObjs).forEach(async (projectProposalObj) => {
      (await projectProposalObj).destroy();
    });
  }
}

async function destroyAssociations(id) {
  const projectTypeAssociationObjs = projectTypeAssociation.findAll({
    where: {
      project_id: id,
    },
  });
  if (projectTypeAssociationObjs) {
    (await projectTypeAssociationObjs).forEach(
      async (projectTypeAssociationObj) => {
        (await projectTypeAssociationObj).destroy();
      }
    );
  }
}

module.exports = { Query, Mutation, Project };
