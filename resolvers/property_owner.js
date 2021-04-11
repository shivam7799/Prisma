const db = require("../models");
const propertyOwners = db.property_owner;
const users = db.user;

const Query = {
  property_owners: async () => await propertyOwners.findAll(),
  property_ownerById: async (root, { id }) => {
    return propertyOwners.findByPk(id);
  }
};

const Mutation = {
  createPropertyOwner: async (root, args, context, info) => {
    const { user_id, first_name, last_name, mobile, created_by } = args;

    return await propertyOwners.create({
      user_id,
      first_name,
      last_name,
      mobile,
      created_by
    });
  },
  updatePropertyOwner: async (root, args, context, info) => {
    const { id, user_id, first_name, last_name, mobile, updated_by } = args;
    const propertyOwnerObj = propertyOwners.findByPk(id);
    if (!propertyOwnerObj) {
      throw new Error(`Couldn’t find PropertyOwner with id ${id}`);
    }

    (await propertyOwnerObj).update({
      user_id,
      first_name,
      last_name,
      mobile,
      updated_by
    });

    return propertyOwnerObj;
  },
  deletePropertyOwner: async (root, args, context, info) => {
    const { id } = args;
    const propertyOwnerObj = propertyOwners.findByPk(id);

    if (!propertyOwnerObj) {
      throw new Error(`Couldn’t find PropertyOwner with id ${id}`);
    }

    (await propertyOwnerObj).destroy();

    return "PropertyOwner deleted successfully";
  }
};

const Property_Owner = {
  user: property_owner => users.findByPk(property_owner.user_id)
};

module.exports = { Query, Mutation, Property_Owner };
