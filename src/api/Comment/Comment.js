import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: (parent) => prisma.comment({ id: parent.id }).user(),
    post: (parent) => prisma.comment({ id: parent.id }).post(),
  },
};
