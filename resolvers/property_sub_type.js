const db = require("../models");
const propertySubTypes = db.property_sub_type;
const propertyTypes = db.property_type;

const Query = {
  property_sub_types: async () => await propertySubTypes.findAll(),
  property_sub_typeById: async (root, { id }) => {
    return propertySubTypes.findByPk(id);
  },
  findByPropertyTypeId: async (root, { id }) => {
    return await propertySubTypes.findAll({
      where: [{ property_type_id: id }],
    });
  },
};

const Property_Sub_Type = {
  property_type: (property_sub_type) =>
    propertyTypes.findByPk(property_sub_type.property_type_id),
};

module.exports = { Query, Property_Sub_Type };
