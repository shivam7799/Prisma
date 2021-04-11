const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_level.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_level");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_levelHandler = server.createHandler(headers);
