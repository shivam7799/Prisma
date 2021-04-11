const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/country.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/country");

const server = new ApolloServer({ typeDefs, resolvers });
exports.countryHandler = server.createHandler(headers);
