const db = require("../models");
const scopeOfWorkPropertyUnit = db.scope_of_work_property_unit;

const Query = {
  scope_of_work_property_units: async () =>
    await scopeOfWorkPropertyUnit.findAll(),
  scope_of_work_property_unitById: async (root, { id }) => {
    return scopeOfWorkPropertyUnit.findByPk(id);
  },
};

const Mutation = {
  saveScopeOfWorkPropertyUnit: async (root, args, context, info) => {
    const { data } = args;
    const obj = JSON.parse(JSON.stringify(data));
    var msg = "";
    for (let element of obj) {
      try {
        const {
          project_proposal_id,
          area_of_work_id,
          property_unit_attribute_id,
          value,
          attribute_custom_name,
          attribute_custom_value,
          attribute_custom_unit,
          created_by,
          updated_by,
        } = element;
        const existRecords = await getExistingRecord(
          project_proposal_id,
          area_of_work_id,
          property_unit_attribute_id
        );

        if (existRecords.length > 0) {
          for (let record of existRecords) {
            await update(record.id, {
              project_proposal_id,
              area_of_work_id,
              property_unit_attribute_id,
              value,
              attribute_custom_name,
              attribute_custom_value,
              attribute_custom_unit,
              updated_by,
            });
          }
          msg = "ScopeOfWOrk of Property Unit updated successfully";
        } else {
          await create({
            project_proposal_id,
            area_of_work_id,
            property_unit_attribute_id,
            value,
            attribute_custom_name,
            attribute_custom_value,
            attribute_custom_unit,
            created_by,
          });
          msg = "ScopeOfWOrk of Property Unit created successfully";
        }
      } catch (error) {
        console.error(error);
      }
    }

    return msg;
  },
};

getExistingRecord = (
  project_proposal_id,
  area_of_work_id,
  product_attribute_unit_id
) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT sow.id FROM ScopeOfWorkPropertyUnits AS sow WHERE sow.project_proposal_id = " +
      project_proposal_id +
      " AND sow.area_of_work_id = " +
      area_of_work_id +
      " AND sow.property_unit_attribute_id = " +
      product_attribute_unit_id;
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran ScopeOfWorkPropertyUnits query: " + query);
      return resolve(results);
    });
  });
};

async function create(params) {
  await scopeOfWorkPropertyUnit.create(params);
}

async function update(id, params) {
  const scopeOfWorkPropertyUnitObj = scopeOfWorkPropertyUnit.findByPk(id);
  if (!scopeOfWorkPropertyUnitObj) {
    throw new Error(`Couldn’t find scopeOfWorkPropertyUnit with id ${id}`);
  }
  (await scopeOfWorkPropertyUnitObj).update(params);
}

module.exports = { Query, Mutation };
