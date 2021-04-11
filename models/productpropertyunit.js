"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPropertyUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductPropertyUnit.belongsTo(models.PropertyUnit);
      ProductPropertyUnit.belongsTo(models.Product);
    }
  }
  ProductPropertyUnit.init(
    {
      property_unit_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ProductPropertyUnit",
      timestamps: false
    }
  );
  return ProductPropertyUnit;
};
