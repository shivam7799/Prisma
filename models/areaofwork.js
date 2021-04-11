"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AreaOfWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AreaOfWork.belongsTo(models.ProjectProposal);
      AreaOfWork.belongsTo(models.UnitLocation);
      AreaOfWork.hasMany(models.ScopeOfWork);
      AreaOfWork.hasMany(models.ScopeOfWorkPropertyUnit);
    }
  }
  AreaOfWork.init(
    {
      project_proposal_id: DataTypes.INTEGER,
      unit_location_id: DataTypes.INTEGER,
      new_unit: DataTypes.STRING,
      existing_unit: DataTypes.STRING,
      unit_alias: DataTypes.STRING,
      work_type: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "AreaOfWork",
      timestamps: false
    }
  );
  return AreaOfWork;
};
