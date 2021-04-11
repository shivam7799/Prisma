"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectTypeAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectTypeAssociation.belongsTo(models.Project);
      ProjectTypeAssociation.belongsTo(models.ProjectType);
    }
  }
  ProjectTypeAssociation.init(
    {
      project_id: DataTypes.INTEGER,
      project_type_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProjectTypeAssociation",
      timestamps: false,
    }
  );
  return ProjectTypeAssociation;
};
