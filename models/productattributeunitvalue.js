"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttributeUnitValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductAttributeUnitValue.belongsTo(models.ProductAttributeUnit);
      ProductAttributeUnitValue.hasMany(models.ScopeOfWork);
    }
  }
  ProductAttributeUnitValue.init(
    {
      value: DataTypes.STRING,
      slug: DataTypes.STRING,
      product_attribute_unit_id: DataTypes.INTEGER,
      custom: DataTypes.BOOLEAN,
      custom_html_element_type: DataTypes.STRING,
      is_default: DataTypes.BOOLEAN,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ProductAttributeUnitValue",
      timestamps: false
    }
  );
  return ProductAttributeUnitValue;
};
