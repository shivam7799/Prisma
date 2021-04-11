const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/state.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/state");

const server = new ApolloServer({ typeDefs, resolvers });
exports.stateHandler = server.createHandler(headers);
