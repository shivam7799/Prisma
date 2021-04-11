"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectProposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectProposal.belongsTo(models.Project);
      ProjectProposal.hasMany(models.AreaOfWork);
      ProjectProposal.hasMany(models.ScopeOfWork);
      ProjectProposal.hasMany(models.ScopeOfWorkPropertyUnit);
    }
  }
  ProjectProposal.init(
    {
      name: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      proposal_status: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ProjectProposal",
      timestamps: false
    }
  );

  ProjectProposal.STATUS_PENDING = "Pending";
  ProjectProposal.STATUS_RUNNING = "Running";
  ProjectProposal.STATUS_COMPLETE = "Complete";
  ProjectProposal.STATUS_ERROR = "Error";
  ProjectProposal.STATUS_ABORT = "Abort";

  return ProjectProposal;
};
