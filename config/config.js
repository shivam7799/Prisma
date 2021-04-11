module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "build_contractor",
    host: "localhost",
    dialect: "mysql",
    port: 3306
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
  },
  production: {
    username: "contractroot",
    password: "Contract$586",
    database: "contract_builder",
    host: "database-1.cluster-cguaj3ut7kdb.us-west-2.rds.amazonaws.com",
    dialect: "mysql",
    port: 3306
  }
};
