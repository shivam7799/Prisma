const db = require("../models");
const areaOfWork = db.area_of_work;
const projectProposal = db.project_proposal;
const unitLocation = db.unit_location;
const propertyLevel = db.property_level;

const Query = {
  area_of_works: async () => await areaOfWork.findAll(),
  area_of_workById: async (root, args, context, info) => {
    return areaOfWork.findByPk(args.id);
  },
  area_of_workByProjectProposalId: async (root, { id }) =>
    await areaOfWork.findAll({ where: [{ project_proposal_id: id }] })
};

const Mutation = {
  createAreaOfWork: async (root, args, context, info) => {
    const {
      project_proposal_id,
      unit_location_id,
      new_unit,
      existing_unit,
      unit_alias,
      work_type,
      created_by
    } = args;

    return await areaOfWork.create({
      project_proposal_id,
      unit_location_id,
      new_unit,
      existing_unit,
      unit_alias,
      work_type,
      created_by
    });
  },
  updateAreaOfWork: async (root, args, context, info) => {
    const {
      id,
      project_proposal_id,
      unit_location_id,
      new_unit,
      existing_unit,
      unit_alias,
      work_type,
      updated_by
    } = args;

    const areaOfWorkObj = areaOfWork.findByPk(id);
    if (!areaOfWorkObj) {
      throw new Error(`Couldn’t find AreaOfWOrk with id ${id}`);
    }

    (await areaOfWorkObj).update({
      project_proposal_id,
      unit_location_id,
      new_unit,
      existing_unit,
      unit_alias,
      work_type,
      updated_by
    });

    return areaOfWorkObj;
  },
  deleteAreaOfWork: async (root, args, context, info) => {
    const { id } = args;
    const areaOfWorkObj = areaOfWork.findByPk(id);

    if (!areaOfWorkObj) {
      throw new Error(`Couldn’t find AreaOfWork with id ${id}`);
    }

    (await areaOfWorkObj).destroy();

    return "AreaOfWork deleted successfully";
  }
};

const AreaOfWork = {
  project_proposal: area_of_work =>
    projectProposal.findByPk(area_of_work.project_proposal_id),
  unit_location: area_of_work =>
    unitLocation.findByPk(area_of_work.unit_location_id)
};

const Unit_Location = {
  property_level: unit_location =>
    propertyLevel.findByPk(unit_location.property_level_id)
};

module.exports = { Query, Mutation, AreaOfWork, Unit_Location };
