const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/scope_of_work.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/scope_of_work");

const server = new ApolloServer({ typeDefs, resolvers });
exports.scope_of_workHandler = server.createHandler(headers);
