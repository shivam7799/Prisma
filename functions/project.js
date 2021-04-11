const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/project.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/project");

const server = new ApolloServer({ typeDefs, resolvers });
exports.projectHandler = server.createHandler(headers);
