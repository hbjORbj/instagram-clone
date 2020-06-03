import { prisma } from "../../../generated/prisma-client";

export default {
  Like: {
    post: (parent) => prisma.like({ id: parent.id }).post(),
    user: (parent) => prisma.like({ id: parent.id }).user(),
  },
};
