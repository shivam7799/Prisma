"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Property_Address);
      Project.hasMany(models.ProjectProposal);
      Project.hasMany(models.ProjectTypeAssociation);
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      property_address_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      start_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
      timestamps: false,
    }
  );
  return Project;
};
