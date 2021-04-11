const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/product_category.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/product_category");

const server = new ApolloServer({ typeDefs, resolvers });
exports.product_categoryHandler = server.createHandler(headers);
