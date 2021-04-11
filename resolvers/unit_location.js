const { Op } = require("sequelize");
const db = require("../models");
const unitLocations = db.unit_location;
const propertySubTypes = db.property_sub_type;
const propertyLevel = db.property_level;
const propertyUnit = db.property_unit;
const areaOfWork = db.area_of_work;

const Query = {
  unit_locations: async () => await unitLocations.findAll(),
  unit_locationById: async (root, { id }) => {
    return unitLocations.findByPk(id);
  },
  unitLocationByPropertySubTypeID: async (root, { id }) =>
    await unitLocations.findAll({ where: [{ property_sub_type_id: id }] }),
  unitLocationAreaOfWork: async (root, args, context, info) => {
    const { property_sub_type_id, project_proposal_id } = args;

    const areaOfWorkList = await areaOfWork.findAll({
      where: [{ project_proposal_id: project_proposal_id }],
    });

    const results = [];
    const unit_location_ids = [];
    if (areaOfWorkList) {
      getAreaOfWork(areaOfWorkList, unit_location_ids, results);
    }

    const unitLocationList = await unitLocations.findAll({
      where: {
        id: { [Op.notIn]: unit_location_ids },
        property_sub_type_id: property_sub_type_id,
      },
    });

    if (unitLocationList) {
      getUnitLocation(unitLocationList, results);
    }

    return results;
  },
};

const Unit_Location = {
  property_sub_type: (unit_location) =>
    propertySubTypes.findByPk(unit_location.property_sub_type_id),
  property_level: (unit_location) =>
    propertyLevel.findByPk(unit_location.property_level_id),
  property_unit: (unit_location) =>
    propertyUnit.findByPk(unit_location.property_unit_id),
};

async function getUnitLocation(unitLocationList, results) {
  await Promise.all(
    unitLocationList.map(async (e) => {
      results.push({
        id: e.id,
        unit_location_id: e.id,
        area_of_work_id: null,
        property_sub_type_id: e.property_sub_type_id,
        property_level_id: e.property_level_id,
        property_unit_id: e.property_unit_id,
        project_proposal_id: null,
        new_unit: "",
        existing_unit: "",
        unit_alias: "",
        work_type: "",
        created_by: e.created_by,
        updated_by: e.updated_by,
        created_at: e.created_at,
        updated_at: e.updated_at,
      });
    })
  );
}

async function getAreaOfWork(areaOfWorkList, unit_location_ids, results) {
  await Promise.all(
    areaOfWorkList.map(async (element) => {
      unit_location_ids.push(element.unit_location_id);
      const unitLocationObj = await unitLocations.findByPk(
        element.unit_location_id
      );
      if (unitLocationObj) {
        results.push({
          id: unitLocationObj.id,
          unit_location_id: unitLocationObj.id,
          area_of_work_id: element.id,
          property_sub_type_id: unitLocationObj.property_sub_type_id,
          property_level_id: unitLocationObj.property_level_id,
          property_unit_id: unitLocationObj.property_unit_id,
          project_proposal_id: element.project_proposal_id,
          new_unit: element.new_unit,
          existing_unit: element.existing_unit,
          unit_alias: element.unit_alias,
          work_type: element.work_type,
          created_by: element.created_by,
          updated_by: element.updated_by,
          created_at: element.created_at,
          updated_at: element.updated_at,
        });
      }
    })
  );
}

module.exports = { Query, Unit_Location };
