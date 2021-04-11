"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertySubTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertySubTypes.belongsTo(models.Property_Type);
      PropertySubTypes.hasMany(models.Property_Address);
      PropertySubTypes.hasMany(models.UnitLocation);
    }
  }
  PropertySubTypes.init(
    {
      property_type_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PropertySubTypes",
      timestamps: false
    }
  );
  return PropertySubTypes;
};
