const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/project_type_association.graphql", {
    encoding: "utf-8"
  })
);
const resolvers = require("../resolvers/project_type_association");

const server = new ApolloServer({ typeDefs, resolvers });
exports.project_type_associationHandler = server.createHandler(headers);
