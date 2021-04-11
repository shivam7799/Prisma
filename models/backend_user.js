"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Backend_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Backend_User.belongsTo(models.User);
    }
  }
  Backend_User.init(
    {
      user_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Backend_User",
      timestamps: false
    }
  );
  return Backend_User;
};
