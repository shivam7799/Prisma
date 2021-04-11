const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/product_attribute_unit_value.graphql", {
    encoding: "utf-8",
  })
);
const resolvers = require("../resolvers/product_attribute_unit_value");

const server = new ApolloServer({ typeDefs, resolvers });
exports.product_attribute_unit_valueHandler = server.createHandler(headers);
