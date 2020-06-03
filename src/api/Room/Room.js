import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: (parent) => prisma.room({ id: parent.id }).participants(),
    messages: (parent) => prisma.room({ id: parent.id }).messages(),
  },
};
