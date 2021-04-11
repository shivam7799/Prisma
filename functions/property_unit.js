const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_unit.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_unit");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_unitHandler = server.createHandler(headers);
