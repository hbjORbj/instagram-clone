export default {
  Mutation: {
    createAccount: async(_, args) => {
      const { username, email } = args;
      const user = await prisma.createUser({ username, email });
      return user;
    },
  },
};
