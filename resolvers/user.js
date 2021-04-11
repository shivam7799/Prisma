const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(Query = {
  users: async () => await prisma.users.findMany(),

  userById: async (parent, args, ctx) => {
    const id = +args.id;
    return await prisma.users.findUnique({
      where: { id }
    });
  }
}),
  (Mutation = {
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
      const userObj = await prisma.users.findUnique({
        where: { id }
      });
      console.log(userObj);
      if (userObj) {
        return await prisma.users.delete({
          where: { id: userObj.id }
        });
      }
    }
  });

module.exports = {
  Query,
  Mutation
};
