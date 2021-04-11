const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_owner.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_owner");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_ownerHandler = server.createHandler(headers);
