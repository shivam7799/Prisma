const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/backend_user.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/backend_user");

const server = new ApolloServer({ typeDefs, resolvers });
exports.backend_userHandler = server.createHandler(headers);
