"use strict";
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
//const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const pool = mysql.createPool({
  connectionLimit: 10,
  password: config.password,
  user: config.username,
  database: config.database,
  host: config.host,
  port: config.port
});

db.pool = pool;

db.user = require("./user.js")(sequelize, Sequelize);
db.contractor = require("./contractor.js")(sequelize, Sequelize);
db.backend_user = require("./backend_user.js")(sequelize, Sequelize);
db.countries = require("./country.js")(sequelize, Sequelize);
db.states = require("./state.js")(sequelize, Sequelize);
db.property_type = require("./property_type.js")(sequelize, Sequelize);
db.property_sub_type = require("./propertysubtypes.js")(sequelize, Sequelize);
db.property_owner = require("./propertyowner.js")(sequelize, Sequelize);
db.cities = require("./city.js")(sequelize, Sequelize);
db.property_address = require("./property_address.js")(sequelize, Sequelize);
db.project = require("./project.js")(sequelize, Sequelize);
db.project_type = require("./projecttype.js")(sequelize, Sequelize);
db.project_proposal = require("./projectproposal.js")(sequelize, Sequelize);
db.property_level = require("./propertylevel.js")(sequelize, Sequelize);
db.attribute = require("./attribute.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);
db.product_attribute_unit = require("./productattributeunit.js")(
  sequelize,
  Sequelize
);
db.product_attribute_unit_value = require("./productattributeunitvalue.js")(
  sequelize,
  Sequelize
);
db.attribute_unit = require("./attributeunit.js")(sequelize, Sequelize);
db.property_unit = require("./propertyunit.js")(sequelize, Sequelize);
db.unit_location = require("./unitlocation.js")(sequelize, Sequelize);
db.area_of_work = require("./areaofwork.js")(sequelize, Sequelize);
db.project_type_association = require("./projecttypeassociation.js")(
  sequelize,
  Sequelize
);
db.product_property_unit = require("./productpropertyunit.js")(
  sequelize,
  Sequelize
);
db.product_category = require("./productcategory.js")(sequelize, Sequelize);
db.property_unit_product_category = require("./propertyunitproductcategory.js")(
  sequelize,
  Sequelize
);
db.property_unit_product_category_product = require("./propertyunitproductcategoryproduct.js")(
  sequelize,
  Sequelize
);
db.scope_of_work = require("./scopeofwork.js")(sequelize, Sequelize, pool);
db.property_unit_attribute = require("./propertyunitattribute.js")(
  sequelize,
  Sequelize
);
db.scope_of_work_property_unit = require("./scopeofworkpropertyunit.js")(
  sequelize,
  Sequelize
);

module.exports = db;
