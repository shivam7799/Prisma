const { ApolloServer } = require("apollo-server");
const { resolvers, typeDefs } = require("./schema");

const port = process.env.PORT || 4000;

new ApolloServer({ resolvers, typeDefs }).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);

// var p = new Promise((resolve, reject) => {

// })
