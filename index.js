const { ApolloServer, gql } = require('apollo-server-lambda');
const fs = require("fs");
const db = require("./app/models");
db.sequelize.sync();

const typeDefs = gql(
  fs.readFileSync("./app/schema/contractors.graphql", { encoding: "utf-8" })
);
const resolvers = require("./app/resolvers/contractors");

const server = new ApolloServer({ typeDefs, resolvers, 
  playground: {    
    endpoint: "/api/graphql" 
  } 
});


// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground: {    
//       endpoint: "/api/graphql"  
//     },
//   context: ({ event, context }) => ({
//     headers: event.headers,
//     functionName: context.functionName,
//     event,
//     context,
//   }),
// });

exports.graphqlHandler = server.createHandler();