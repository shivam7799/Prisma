const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/product.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/product");

const server = new ApolloServer({ typeDefs, resolvers });
exports.productHandler = server.createHandler(headers);
