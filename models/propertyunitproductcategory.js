"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyUnitProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyUnitProductCategory.belongsTo(models.PropertyUnit);
      PropertyUnitProductCategory.belongsTo(models.ProductCategory);
      PropertyUnitProductCategory.hasMany(
        models.PropertyUnitProductCategoryProduct
      );
    }
  }
  PropertyUnitProductCategory.init(
    {
      property_unit_id: DataTypes.INTEGER,
      product_category_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PropertyUnitProductCategory",
      timestamps: false
    }
  );
  return PropertyUnitProductCategory;
};
