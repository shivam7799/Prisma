"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScopeOfWorkPropertyUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScopeOfWorkPropertyUnit.belongsTo(models.ProjectProposal);
      ScopeOfWorkPropertyUnit.belongsTo(models.AreaOfWork);
      ScopeOfWorkPropertyUnit.belongsTo(models.PropertyUnitAttribute);
    }
  }
  ScopeOfWorkPropertyUnit.init(
    {
      project_proposal_id: DataTypes.INTEGER,
      area_of_work_id: DataTypes.INTEGER,
      property_unit_attribute_id: DataTypes.INTEGER,
      value: DataTypes.STRING,
      attribute_custom_name: DataTypes.STRING,
      attribute_custom_value: DataTypes.STRING,
      attribute_custom_unit: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ScopeOfWorkPropertyUnit",
      timestamps: false,
    }
  );
  return ScopeOfWorkPropertyUnit;
};
