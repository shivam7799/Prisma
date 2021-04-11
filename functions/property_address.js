const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_address.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_address");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_addressHandler = server.createHandler(headers);
