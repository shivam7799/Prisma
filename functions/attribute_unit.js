const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/attribute_unit.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/attribute_unit");

const server = new ApolloServer({ typeDefs, resolvers });
exports.attribute_unitHandler = server.createHandler(headers);
