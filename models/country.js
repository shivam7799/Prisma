"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.State);
    }
  }
  Country.init(
    {
      country_name: DataTypes.STRING,
      country_code: DataTypes.CHAR(2),
      iso3: DataTypes.CHAR(3),
      phone_code: DataTypes.STRING(5),
      status: DataTypes.BOOLEAN,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Country",
      timestamps: false
    }
  );
  return Country;
};
