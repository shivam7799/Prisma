const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_unit_attribute.graphql", {
    encoding: "utf-8"
  })
);
const resolvers = require("../resolvers/property_unit_attribute");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_unit_attributeHandler = server.createHandler(headers);
