"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.belongsTo(models.Country);
      State.hasMany(models.City);
    }
  }
  State.init(
    {
      country_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      state_code: DataTypes.STRING(3),
      status: DataTypes.BOOLEAN,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "State",
      timestamps: false
    }
  );
  return State;
};
