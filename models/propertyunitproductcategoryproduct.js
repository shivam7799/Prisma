"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyUnitProductCategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyUnitProductCategoryProduct.belongsTo(
        models.PropertyUnitProductCategory
      );
      PropertyUnitProductCategoryProduct.belongsTo(models.Product);
    }
  }
  PropertyUnitProductCategoryProduct.init(
    {
      property_unit_product_category_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      display_order: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PropertyUnitProductCategoryProduct",
      timestamps: false
    }
  );
  return PropertyUnitProductCategoryProduct;
};
