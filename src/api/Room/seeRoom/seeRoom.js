import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const myPresence = await prisma.$exists.room({
        participants_some: {
          id: user.id,
        },
      });
      if (myPresence) {
        return prisma.room({ id });
      } else {
        throw Error("You can't enter this room.");
      }
    },
  },
};
