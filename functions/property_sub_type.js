const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/property_sub_type.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_sub_type");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_sub_typeHandler = server.createHandler(headers);
