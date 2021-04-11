const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/contractor.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/contractor");

const server = new ApolloServer({ typeDefs, resolvers });
exports.contractorHandler = server.createHandler(headers);
