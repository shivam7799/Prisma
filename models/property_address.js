"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property_Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property_Address.belongsTo(models.PropertyOwner);
      Property_Address.belongsTo(models.City);
      Property_Address.belongsTo(models.PropertySubTypes);
      Property_Address.hasMany(models.Project);
    }
  }
  Property_Address.init(
    {
      street: DataTypes.STRING,
      property_owner_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      property_sub_type_id: DataTypes.INTEGER,
      construction_type: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      withBasement: DataTypes.BOOLEAN,
      storyId: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Property_Address",
      timestamps: false
    }
  );
  return Property_Address;
};
