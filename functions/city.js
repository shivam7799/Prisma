const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");
const headers = require("../config/header.js");
const typeDefs = gql(
  fs.readFileSync("schema/city.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/city");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
exports.cityHandler = server.createHandler(headers);
