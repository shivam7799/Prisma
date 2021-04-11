const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/unit_location.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/unit_location");

const server = new ApolloServer({ typeDefs, resolvers });
exports.unit_locationHandler = server.createHandler(headers);
