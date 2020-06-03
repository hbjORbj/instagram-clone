import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: (parent) => prisma.message({ id: parent.id }).from(),
    to: (parent) => prisma.message({ id: parent.id }).to(),
    room: (parent) => prisma.message({ id: parent.id }).room(),
  },
};
