"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttributeUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductAttributeUnit.hasMany(models.ProductAttributeUnitValue);
      ProductAttributeUnit.hasMany(models.ScopeOfWork);
    }
  }
  ProductAttributeUnit.init(
    {
      name: DataTypes.STRING,
      attribute_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
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
      modelName: "ProductAttributeUnit",
      timestamps: false,
    }
  );
  return ProductAttributeUnit;
};
