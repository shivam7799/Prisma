const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/project_proposal.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/project_proposal");

const server = new ApolloServer({ typeDefs, resolvers });
exports.project_proposalHandler = server.createHandler(headers);
