"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScopeOfWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScopeOfWork.belongsTo(models.ProjectProposal);
      ScopeOfWork.belongsTo(models.AreaOfWork);
      ScopeOfWork.belongsTo(models.ProductAttributeUnit);
      ScopeOfWork.belongsTo(models.ProductAttributeUnitValue);
    }
  }
  ScopeOfWork.init(
    {
      project_proposal_id: DataTypes.INTEGER,
      area_of_work_id: DataTypes.INTEGER,
      product_attribute_unit_id: DataTypes.INTEGER,
      product_attribute_unit_value_id: DataTypes.INTEGER,
      attribute_custom_name: DataTypes.STRING,
      attribute_custom_value: DataTypes.STRING,
      attribute_custom_unit: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ScopeOfWork",
      timestamps: false
    }
  );
  return ScopeOfWork;
};
