const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

Query = {
  contractors: async () => await prisma.contractors.findMany(),
  contractorById: async (parent, args, ctx) => {
    const id = +args.id;
    return await prisma.contractors.findUnique({
      where: { id: id }
    });
  }
};

Mutation = {
  createContractor: async (parent, args, ctx) => {
    return await prisma.contractors.create({
      data: {
        user_id: args.user_id,
        first_name: args.first_name,
        last_name: args.last_name,
        mobile: args.mobile,
        company_name: args.company_name,
        created_by: args.created_by
      }
    });
  },

  updateContractor: async (parent, args, ctx) => {
    const id = +args.id;
    const {
      user_id,
      first_name,
      last_name,
      mobile,
      company_name,
      updated_by
    } = args;
    return await prisma.contractors.update({
      where: { id },
      data: {
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        company_name: company_name,
        updated_by: updated_by
      }
    });
  },
  deleteContractor: async (parent, args, ctx) => {
    const id = +args.id;
    const contractorObj = await prisma.contractors.findUnique({
      where: { id }
    });
    if (!contractorObj) {
      return `Contractor with id = ${id} is not available or already deleted.`;
    }
    // console.log(contractorObj);
    if (contractorObj) {
      await prisma.contractors.delete({
        where: { id: contractorObj.id }
      });
      return `Contractor deleted successfully.`;
    }
  }
};

const Contractor = {
  user: contractor =>
    prisma.users.findUnique({
      where: { id: contractor.user_id }
    })
};

module.exports = { Query, Mutation, Contractor };
