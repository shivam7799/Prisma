const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/area_of_work.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/area_of_work");

const server = new ApolloServer({ typeDefs, resolvers });
exports.area_of_workHandler = server.createHandler(headers);
