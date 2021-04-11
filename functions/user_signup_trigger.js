const mysql = require("mysql");
const AWS = require("aws-sdk");
const username = process.env.PROD_DB_USER;
const host = process.env.PROD_DB_HOST;
const database = process.env.PROD_DB_NAME;
const region = process.env.REGION;
const sqlport = process.env.PROD_DB_PORT;
const password = process.env.PROD_DB_PASSWORD;

const CREATED_BY = 1;
const UPDATED_BY = 1;
const USER_TYPE_BACKEND = 1;
const USER_TYPE_CONTRACTOR = 2;
const USER_TYPE_PROPERTY_OWNER = 3;

const pool = mysql.createPool({
  connectionLimit: 10,
  password: password,
  user: username,
  database: database,
  host: host,
  port: sqlport,
});

userPromise = (event) => {
  var userName = event.userName;
  var uEmail = event.request.userAttributes.email;
  var uName = event.request.userAttributes.name;
  var userType = event.request.userAttributes["custom:user_type"];
  var isVerified = event.request.userAttributes.email_verified;
  if (typeof isVerified !== "undefined" && isVerified) {
    isVerified = true;
  } else {
    isVerified = false;
  }

  return new Promise((resolve, reject) => {
    var query =
      "INSERT INTO `Users` (`id`, `user_type`, `email`, `created_at`, `updated_at`, `created_by`, `updated_by`, `email_verified`, `username`, `name`) VALUES (NULL, '" +
      userType +
      "', '" +
      uEmail +
      "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '" +
      CREATED_BY +
      "', '" +
      UPDATED_BY +
      "', " +
      isVerified +
      ", '" +
      userName +
      "', '" +
      uName +
      "')";
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran user query: " + query);
      return resolve(results.insertId);
    });
  });
};

backendPromise = (event, userId) => {
  var uName = event.request.userAttributes.name;

  return new Promise((resolve, reject) => {
    var backendQuery =
      "INSERT INTO `Backend_Users` (`user_id`, `first_name`, `last_name`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES ('" +
      userId +
      "', '" +
      uName +
      "', NULL , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '" +
      CREATED_BY +
      "', '" +
      UPDATED_BY +
      "')";
    pool.query(backendQuery, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran backendQuery: " + backendQuery);
      return resolve(results);
    });
  });
};

contractorPromise = (event, userId) => {
  var uName = event.request.userAttributes.name;

  return new Promise((resolve, reject) => {
    var contractorQuery =
      "INSERT INTO `Contractors` (`user_id`, `first_name`, `last_name`, `mobile`, `company_name`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES ('" +
      userId +
      "', '" +
      uName +
      "', NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '" +
      CREATED_BY +
      "', '" +
      UPDATED_BY +
      "')";
    pool.query(contractorQuery, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran contractorQuery: " + contractorQuery);
      return resolve(results);
    });
  });
};

propertyOwnerPromise = (event, userId) => {
  var uName = event.request.userAttributes.name;

  return new Promise((resolve, reject) => {
    var propertyOwnerQuery =
      "INSERT INTO `PropertyOwners` (`user_id`, `first_name`, `last_name`, `mobile`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES ('" +
      userId +
      "', '" +
      uName +
      "', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '" +
      CREATED_BY +
      "', '" +
      UPDATED_BY +
      "')";
    pool.query(propertyOwnerQuery, (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log("Ran propertyOwnerQuery: " + propertyOwnerQuery);
      return resolve(results);
    });
  });
};

exports.signupTriggerHandler = async (event) => {
  console.log(event);
  if (event.request.userAttributes.email) {
    const userType = event.request.userAttributes["custom:user_type"];
    try {
      const userId = await userPromise(event);
      if (userId) {
        if (userType == USER_TYPE_BACKEND) {
          await backendPromise(event, userId);
        }

        if (userType == USER_TYPE_CONTRACTOR) {
          await contractorPromise(event, userId);
        }

        if (userType == USER_TYPE_PROPERTY_OWNER) {
          await propertyOwnerPromise(event, userId);
        }
      }

      // here you can do something with the three results
    } catch (error) {
      console.log(error);
    }
  }

  return event;
};
