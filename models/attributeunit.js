"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AttributeUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttributeUnit.hasMany(models.ProductAttributeUnit);
      AttributeUnit.belongsTo(models.Attribute);
      AttributeUnit.hasMany(models.PropertyUnitAttribute);
    }
  }
  AttributeUnit.init(
    {
      attribute_parent_id: DataTypes.INTEGER,
      unit_name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "AttributeUnit",
      timestamps: false
    }
  );
  return AttributeUnit;
};
