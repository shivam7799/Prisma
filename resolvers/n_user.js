const db = require("../models");
const User = db.user;

const Query = {
  users: async () => await User.findAll(),
  userById: async (root, { id }) => {
    return User.findByPk(id);
  }
};

const Mutation = {
  createUser: async (root, args, context, info) => {
    const { user_type, email, created_by } = args;
    return await User.create({ user_type, email, created_by });
  },
  updateUser: async (root, args, context, info) => {
    const { id, user_type, email, updated_by } = args;
    const UserObj = User.findByPk(id);
    if (!UserObj) {
      throw new Error(`Couldn’t find user with id ${id}`);
    }

    (await UserObj).update({
      email: email,
      user_type: user_type,
      updated_by: updated_by
    });

    return UserObj;
  },
  deleteUser: async (root, args, context, info) => {
    const { id } = args;
    const UserObj = User.findByPk(id);

    if (!UserObj) {
      throw new Error(`Couldn’t find user with id ${id}`);
    }

    (await UserObj).destroy();

    return "User deleted successfully";
  }
};

module.exports = { Query, Mutation };
