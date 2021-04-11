"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyUnitAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyUnitAttribute.belongsTo(models.PropertyUnit);
      PropertyUnitAttribute.belongsTo(models.Attribute);
      PropertyUnitAttribute.belongsTo(models.AttributeUnit);
      PropertyUnitAttribute.hasMany(models.ScopeOfWorkPropertyUnit);
    }
  }
  PropertyUnitAttribute.init(
    {
      property_unit_id: DataTypes.INTEGER,
      attribute_id: DataTypes.INTEGER,
      attribute_unit_id: DataTypes.INTEGER,
      html_element_type: DataTypes.STRING,
      display_order: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PropertyUnitAttribute",
      timestamps: false,
    }
  );
  return PropertyUnitAttribute;
};
