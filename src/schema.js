const { PrismaClient } = require("@prisma/client");
const { gql } = require("apollo-server-lambda");
const prisma = new PrismaClient();

const typeDefs = gql`
  scalar Date

  type Query {
    allusers: [User]
    userById(id: ID!): User
  }

  type Mutation {
    createUser(
      user_type: String!
      email: String
      status: Boolean
      email_verified: Boolean
      created_by: Int!
    ): User!

    updateUser(
      id: ID!
      user_type: String
      email: String
      updated_by: Int
    ): User!

    deleteUser(id: ID!): String
  }

  type User {
    id: ID!
    user_type: String
    email: String
    status: String
    created_by: Int
    updated_by: Int
    created_at: Date
    updated_at: Date
  }
`;

const resolvers = {
  Query: {
    allusers: async () => await prisma.users.findMany(),

    userById: async (parent, args, ctx) => {
      const id = +args.id;
      return await prisma.users.findUnique({
        where: { id }
      });
    }
  },

  Mutation: {
    createUser: async (parent, args, ctx) => {
      return await prisma.users.create({
        data: {
          user_type: args.user_type,
          email: args.email,
          created_by: args.created_by
        }
      });
    },

    updateUser: async (parent, args, ctx) => {
      const id = +args.id;
      const { user_type, email, updated_by } = args;
      return await prisma.users.update({
        where: {
          id
        },
        data: { email: email, user_type: user_type, updated_by: updated_by }
      });
    },

    deleteUser: async (parent, args, ctx) => {
      const id = +args.id;
      const data = await prisma.users.findUnique({
        where: { id }
      });
      console.log(data);
      await data.delete({
        where: { id: parent.id }
      });
      return data;
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};
