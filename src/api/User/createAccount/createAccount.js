import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const usernameExists = await prisma.$exists.user({ username });
      const emailExists = await prisma.$exists.user({ email });
      if (usernameExists) {
        throw Error("This username already exists.");
      } else if (emailExists) {
        throw Error("This email has already been used to create an account.");
      } else {
        await prisma.createUser({ username, email, firstName, lastName, bio });
        return true;
      }
    },
  },
};
