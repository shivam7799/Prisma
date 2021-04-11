const db = require("../models");
const scopeOfWork = db.scope_of_work;
const CUSTOM = "custom";
const Query = {
  scope_of_works: async () => await scopeOfWork.findAll(),
  scope_of_workById: async (root, { id }) => {
    return scopeOfWork.findByPk(id);
  },
  scope_of_work_detail: async (root, args, context, info) => {
    // return json
    return true;
    return getScopeOfWorkDetail(args);
  },
};

const Mutation = {
  saveScopeOfWork: async (root, args, context, info) => {
    const { data } = args;
    const obj = JSON.parse(JSON.stringify(data));
    var msg = "";
    for (let element of obj) {
      try {
        const {
          id,
          project_proposal_id,
          area_of_work_id,
          product_attribute_unit_id,
          product_attribute_unit_value_id,
          attribute_custom_name,
          attribute_custom_value,
          attribute_custom_unit,
          created_by,
          updated_by,
        } = element;

        if (id && id > 0) {
          await update(id, {
            project_proposal_id,
            area_of_work_id,
            product_attribute_unit_id,
            product_attribute_unit_value_id,
            attribute_custom_name,
            attribute_custom_value,
            attribute_custom_unit,
            updated_by,
          });
          msg = "ScopeOfWOrk updated successfully";
        } else {
          await create({
            project_proposal_id,
            area_of_work_id,
            product_attribute_unit_id,
            product_attribute_unit_value_id,
            attribute_custom_name,
            attribute_custom_value,
            attribute_custom_unit,
            created_by,
          });
          msg = "ScopeOfWOrk created successfully";
        }
      } catch (error) {
        console.error(error);
      }
    }

    return msg;
  },
  deleteScopeOfWork: async (root, args, context, info) => {
    const { id } = args;
    const scopeOfWorkObj = scopeOfWork.findByPk(id);

    if (!scopeOfWorkObj) {
      throw new Error(`Couldn’t find ScopeOfWOrk with id ${id}`);
    }

    (await scopeOfWorkObj).destroy();

    return "ScopeOfWOrk deleted successfully";
  },
};

async function create(params) {
  await scopeOfWork.create(params);
}

async function update(id, params) {
  const scopeOfWorkObj = scopeOfWork.findByPk(id);
  if (!scopeOfWorkObj) {
    throw new Error(`Couldn’t find ScopeOfWOrk with id ${id}`);
  }
  (await scopeOfWorkObj).update(params);
}

areaOfWorkRecords = (areaOfWorkId) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT aw.id AS area_of_work_id, aw.project_proposal_id, aw.unit_location_id, aw.unit_alias AS property_unit_alias, ul.property_level_id, ul.property_unit_id, pl.name AS property_level_name, pu.name AS property_unit_name FROM AreaOfWorks As aw LEFT JOIN UnitLocations AS ul ON ul.id = aw.unit_location_id LEFT JOIN PropertyLevels AS pl ON pl.id = ul.property_level_id LEFT JOIN PropertyUnits AS pu ON pu.id = ul.property_unit_id WHERE aw.id = " +
      areaOfWorkId;

    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran areaOfWork query: " + query);
      return resolve(results);
    });
  });
};

productCategoryRecords = (property_unit_id) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT pupc.product_category_id, pc.name AS category_name FROM PropertyUnitProductCategories AS pupc JOIN ProductCategories AS pc ON pc.id = pupc.product_category_id WHERE pupc.property_unit_id = " +
      property_unit_id;
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran category query: " + query);
      return resolve(results);
    });
  });
};

categoryProductRecords = (product_category_id) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT pc.product_id, pc.display_order, p.name AS product_name FROM PropertyUnitProductCategoryProducts AS pc JOIN Products AS p ON p.id = pc.product_id WHERE pc.property_unit_product_category_id = " +
      product_category_id +
      " order by pc.display_order ASC";
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran category products query: " + query);
      return resolve(results);
    });
  });
};

productAttributeUnitRecords = (product_id) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT pau.id, pau.html_element_type, pau.display_order, pau.attribute_id, pau.attribute_unit_id, a.name AS attribute_name, au.unit_name FROM ProductAttributeUnits AS pau JOIN Attributes AS a ON a.id = pau.attribute_id JOIN AttributeUnits AS au ON au.id = pau.attribute_unit_id WHERE pau.product_id = " +
      product_id +
      " order by pau.display_order ASC";
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran product attribute query: " + query);
      return resolve(results);
    });
  });
};

productAttributeUnitValueRecords = (product_attribute_unit_id) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT pauv.id, pauv.value, pauv.custom, pauv.custom_html_element_type FROM ProductAttributeUnitValues AS pauv WHERE pauv.product_attribute_unit_id = " +
      product_attribute_unit_id;
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran product attribute value query: " + query);
      return resolve(results);
    });
  });
};

scopeOfWorkFunction = (area_of_work_id, project_proposal_id) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT sow.id, sow.product_attribute_unit_id, sow.product_attribute_unit_value_id, sow.attribute_custom_name, sow.attribute_custom_value, sow.attribute_custom_unit, pauv.value, pauv.custom FROM ScopeOfWorks AS sow JOIN ProductAttributeUnitValues AS pauv ON pauv.id = sow.product_attribute_unit_value_id WHERE sow.project_proposal_id = " +
      project_proposal_id +
      " AND sow.area_of_work_id = " +
      area_of_work_id;
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran scopeOfWork query: " + query);
      return resolve(results);
    });
  });
};

getPropertyUnitAttributes = (
  property_unit_id,
  area_of_work_id,
  project_proposal_id
) => {
  return new Promise((resolve, reject) => {
    var query =
      'SELECT pua.id, pua.html_element_type, pua.display_order, a.name AS attribute_name, au.unit_name AS attribute_unit_name, IFNULL(spu.value,"") AS value, spu.attribute_custom_name, spu.attribute_custom_value, spu.attribute_custom_unit FROM PropertyUnitAttributes AS pua JOIN Attributes AS a ON a.id = pua.attribute_id JOIN AttributeUnits AS au ON au.id = pua.attribute_unit_id LEFT JOIN ScopeOfWorkPropertyUnits AS spu ON spu.property_unit_attribute_id = pua.id AND spu.project_proposal_id = ' +
      project_proposal_id +
      " AND spu.area_of_work_id = " +
      area_of_work_id +
      " WHERE pua.property_unit_id = " +
      property_unit_id +
      " ORDER BY pua.display_order ASC";
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran PropertyUnitAttributes query: " + query);
      return resolve(results);
    });
  });
};

async function getScopeOfWorkDetail(args) {
  var jsonObj = [];
  const areaOfWorkId = args.area_work_id;
  var product_categories = [];
  var categoryComponents = [];
  var productAttributeComponent = [];
  var prodAttributeRows = [];
  var propertyUnitAttributes = [];
  try {
    const areaRecords = await areaOfWorkRecords(areaOfWorkId);

    if (areaRecords) {
      for (const areaRecord of areaRecords) {
        var scopeOfWorkRecords = [];
        const scopeOfWorkRows = await scopeOfWorkFunction(
          areaRecord.area_of_work_id,
          areaRecord.project_proposal_id
        );
        for (const scopeOfWorkRow of scopeOfWorkRows) {
          var unitId = scopeOfWorkRow.product_attribute_unit_id;
          var unitValueId = scopeOfWorkRow.product_attribute_unit_value_id;
          var unitValue = scopeOfWorkRow.value;
          var unitCustom = scopeOfWorkRow.custom;
          var unitCustomVal = scopeOfWorkRow.attribute_custom_value;
          scopeOfWorkRecords[unitId] = [
            {
              valueId: unitValueId,
              value: unitValue,
              custom: unitCustom,
              unitCustomVal: unitCustomVal,
            },
          ];
        }

        const categories = await productCategoryRecords(
          areaRecord.property_unit_id
        );
        if (categories) {
          for (const category of categories) {
            const catProducts = await categoryProductRecords(
              category.product_category_id
            );
            if (catProducts) {
              for (const catProduct of catProducts) {
                const prodAttributes = await productAttributeUnitRecords(
                  catProduct.product_id
                );
                if (prodAttributes) {
                  for (productAttribute of prodAttributes) {
                    var prodAttributeValues = [];
                    var prodAttrCustomValues = [];
                    var scope_of_work_record =
                      productAttribute.id in scopeOfWorkRecords
                        ? scopeOfWorkRecords[productAttribute.id][0]
                        : "";
                    const prodAttributeValueRecords = await productAttributeUnitValueRecords(
                      productAttribute.id
                    );
                    if (prodAttributeValueRecords) {
                      for (prodAttributeValueRecord of prodAttributeValueRecords) {
                        if (prodAttributeValueRecord.custom) {
                          prodAttrCustomValues.push({
                            type: CUSTOM,
                            key:
                              prodAttributeValueRecord.custom_html_element_type,
                            name: productAttribute.attribute_name,
                            placeholder: productAttribute.attribute_name,
                            product_attribute_unit_id: productAttribute.id,
                            id: scope_of_work_record
                              ? scope_of_work_record.valueId
                              : "",
                            value: scope_of_work_record
                              ? scope_of_work_record.custom
                                ? scope_of_work_record.unitCustomVal
                                : ""
                              : "",
                          });
                        }

                        prodAttributeValues.push({
                          id: prodAttributeValueRecord.id, // product_attribute_unit_value.id
                          value: prodAttributeValueRecord.value,
                          label: prodAttributeValueRecord.custom
                            ? CUSTOM
                            : prodAttributeValueRecord.value,
                          isCustom: prodAttributeValueRecord.custom
                            ? true
                            : false,
                        });
                      }
                    }
                    prodAttributeRows.push({
                      cssClass: "row",
                      columns: [
                        {
                          cssClass: "col-md-3",
                          components: [
                            {
                              id: productAttribute.id,
                              key: "label",
                              label: productAttribute.attribute_name,
                            },
                          ],
                        },
                        {
                          cssClass: "col-md-7",
                          components: [
                            {
                              key: productAttribute.html_element_type,
                              product_attribute_unit_id: productAttribute.id,
                              product_attribute_unit_type: {
                                id: productAttribute.attribute_unit_id,
                                label: productAttribute.unit_name,
                              },
                              id: scope_of_work_record
                                ? scope_of_work_record.valueId
                                : "", // product_attribute_unit_value.id for selected
                              value: scope_of_work_record
                                ? scope_of_work_record.custom
                                  ? scope_of_work_record.unitCustomVal
                                  : scope_of_work_record.value
                                : "",
                              // product_attribute_unit_value.value for selected
                              validate: {
                                required: true,
                              },
                              values: prodAttributeValues,
                            },
                          ],
                        },
                        {
                          cssClass: "col-md-2",
                          components: prodAttrCustomValues,
                        },
                      ],
                    });
                  }

                  productAttributeComponent.push({
                    key: "panelTable",
                    rows: prodAttributeRows,
                  });
                }
                categoryComponents.push({
                  key: "panel",
                  title: catProduct.product_name,
                  product_id: catProduct.product_id,
                  display_order: catProduct.display_order,
                  components: productAttributeComponent,
                });
              }
            }

            product_categories.push({
              id: category.product_category_id,
              name: category.category_name,
              components: categoryComponents,
            });
          }
        }

        const propertyUnitAttributeRecords = await getPropertyUnitAttributes(
          areaRecord.property_unit_id,
          areaRecord.area_of_work_id,
          areaRecord.project_proposal_id
        );
        if (propertyUnitAttributeRecords) {
          for (const propertyUnitAttributeRecord of propertyUnitAttributeRecords) {
            propertyUnitAttributes.push({
              id: propertyUnitAttributeRecord.id,
              attribute_name: propertyUnitAttributeRecord.attribute_name,
              attribute_unit_name:
                propertyUnitAttributeRecord.attribute_unit_name,
              html_element_type: propertyUnitAttributeRecord.html_element_type,
              display_order: propertyUnitAttributeRecord.display_order,
              value: propertyUnitAttributeRecord.value,
            });
          }
        }
        jsonObj.push({
          property_unit_id: areaRecord.property_unit_id, // unitlocations
          property_unit_name: areaRecord.property_unit_name, // propertyunits
          property_unit_alias: areaRecord.property_unit_alias, // areaofworks
          area_of_work_id: areaRecord.area_of_work_id, // areaofworks
          unit_location_id: areaRecord.unit_location_id, //areaofworks
          property_level_id: areaRecord.property_level_id, // unitlocations
          property_level_name: areaRecord.property_level_name,
          property_unit_attribute: propertyUnitAttributes,
          product_categories: product_categories,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  return jsonObj;
}

module.exports = { Query, Mutation };
