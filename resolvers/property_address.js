const db = require("../models");
const propertyAddresses = db.property_address;
const propertyOwners = db.property_owner;
const cities = db.cities;
const states = db.states;
const countries = db.countries;
const propertySubTypes = db.property_sub_type;
const propertyType = db.property_type;

const Query = {
  property_addresses: async () => await propertyAddresses.findAll(),
  property_addressById: async (root, { id }) => {
    return propertyAddresses.findByPk(id);
  },
  propertyAddressByPropertyOwnerId: async (root, { id }) =>
    await propertyAddresses.findAll({ where: [{ property_owner_id: id }] })
};

const Mutation = {
  createPropertyAddress: async (root, args, context, info) => {
    const {
      street,
      property_owner_id,
      city_id,
      property_sub_type_id,
      construction_type,
      postal_code,
      withBasement,
      storyId,
      created_by
    } = args;

    return await propertyAddresses.create({
      street,
      property_owner_id,
      city_id,
      property_sub_type_id,
      construction_type,
      postal_code,
      withBasement,
      storyId,
      created_by
    });
  },
  updatePropertyAddress: async (root, args, context, info) => {
    const {
      id,
      street,
      property_owner_id,
      city_id,
      property_sub_type_id,
      construction_type,
      postal_code,
      withBasement,
      storyId,
      updated_by
    } = args;
    const propertyAddressObj = propertyAddresses.findByPk(id);
    if (!propertyAddressObj) {
      throw new Error(`Couldn’t find PropertyAddress with id ${id}`);
    }

    (await propertyAddressObj).update({
      street,
      property_owner_id,
      city_id,
      property_sub_type_id,
      construction_type,
      postal_code,
      withBasement,
      storyId,
      updated_by
    });

    return propertyAddressObj;
  },
  deletePropertyAddress: async (root, args, context, info) => {
    const { id } = args;
    const propertyAddressObj = propertyAddresses.findByPk(id);

    if (!propertyAddressObj) {
      throw new Error(`Couldn’t find PropertyAddress with id ${id}`);
    }

    (await propertyAddressObj).destroy();

    return "PropertyAddress deleted successfully";
  }
};

const Property_Address = {
  property_owner: property_address =>
    propertyOwners.findByPk(property_address.property_owner_id),
  city: property_address => cities.findByPk(property_address.city_id),
  property_sub_type: property_address =>
    propertySubTypes.findByPk(property_address.property_sub_type_id)
};

const Property_Sub_Type = {
  property_type: property_sub_type =>
    propertyType.findByPk(property_sub_type.property_type_id)
};

const City = {
  state: city => states.findByPk(city.state_id)
};

const State = {
  country: state => countries.findByPk(state.country_id)
};

module.exports = {
  Query,
  Mutation,
  Property_Address,
  Property_Sub_Type,
  City,
  State
};
