const db = require("../models");
const backendUsers = db.backend_user;
const users = db.user;

const Query = {
  backend_users: async () => await backendUsers.findAll(),
  backend_userById: async (root, { id }) => {
    return backendUsers.findByPk(id);
  }
};

const Mutation = {
  createBackend_User: async (root, args, context, info) => {
    const { user_id, first_name, last_name, created_by } = args;

    return await backendUsers.create({
      user_id,
      first_name,
      last_name,
      created_by
    });
  },
  updateBackend_User: async (root, args, context, info) => {
    const { id, user_id, first_name, last_name, updated_by } = args;
    const backendUserObj = backendUsers.findByPk(id);
    if (!backendUserObj) {
      throw new Error(`Couldn’t find Backend_User with id ${id}`);
    }

    (await backendUserObj).update({
      user_id,
      first_name,
      last_name,
      updated_by
    });

    return backendUserObj;
  },
  deleteBackend_User: async (root, args, context, info) => {
    const { id } = args;
    const backendUserObj = backendUsers.findByPk(id);

    if (!backendUserObj) {
      throw new Error(`Couldn’t find Backend_User with id ${id}`);
    }

    (await backendUserObj).destroy();

    return "Backend_User deleted successfully";
  }
};

const Backend_User = {
  user: backend_user => users.findByPk(backend_user.user_id)
};

module.exports = { Query, Mutation, Backend_User };
