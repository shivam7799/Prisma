const db = require("../models");
const projectProposal = db.project_proposal;
const projects = db.project;

const Query = {
  project_proposals: async () => await projectProposal.findAll(),
  project_proposalById: async (root, { id }) => {
    return projectProposal.findByPk(id);
  }
};

const Mutation = {
  createProjectProposal: async (root, args, context, info) => {
    const { project_id, name, proposal_status, created_by } = args;

    return await projectProposal.create({
      project_id,
      name,
      proposal_status,
      created_by
    });
  },
  updateProjectProposal: async (root, args, context, info) => {
    const { id, project_id, name, proposal_status, updated_by } = args;
    const projectProposalObj = projectProposal.findByPk(id);
    if (!projectProposalObj) {
      throw new Error(`Couldn’t find Project_Proposal with id ${id}`);
    }

    (await projectProposalObj).update({
      project_id,
      name,
      proposal_status,
      updated_by
    });

    return projectProposalObj;
  },
  deleteProjectProposal: async (root, args, context, info) => {
    const { id } = args;
    const projectProposalObj = projectProposal.findByPk(id);

    if (!projectProposalObj) {
      throw new Error(`Couldn’t find Project_Proposal with id ${id}`);
    }

    (await projectProposalObj).destroy();

    return "Project_Proposal deleted successfully";
  }
};

const Project_Proposal = {
  project: project_proposal => projects.findByPk(project_proposal.project_id)
};

module.exports = { Query, Mutation, Project_Proposal };
