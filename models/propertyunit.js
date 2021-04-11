"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyUnit.hasMany(models.UnitLocation);
      PropertyUnit.hasMany(models.ProductPropertyUnit);
      PropertyUnit.hasMany(models.PropertyUnitProductCategory);
      PropertyUnit.hasMany(models.PropertyUnitAttribute);
    }
  }
  PropertyUnit.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PropertyUnit",
      timestamps: false
    }
  );
  return PropertyUnit;
};
