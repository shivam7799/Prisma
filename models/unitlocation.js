"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UnitLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UnitLocation.belongsTo(models.PropertySubTypes);
      UnitLocation.belongsTo(models.PropertyLevel);
      UnitLocation.belongsTo(models.PropertyUnit);
      UnitLocation.hasMany(models.AreaOfWork);
    }
  }
  UnitLocation.init(
    {
      property_sub_type_id: DataTypes.INTEGER,
      property_level_id: DataTypes.INTEGER,
      property_unit_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UnitLocation",
      timestamps: false,
    }
  );
  return UnitLocation;
};
