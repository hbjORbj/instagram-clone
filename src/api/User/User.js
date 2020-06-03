import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    likes: (parent) => prisma.user({ id: parent.id }).likes(),
    posts: (parent) => prisma.user({ id: parent.id }).posts(),
    comments: (parent) => prisma.user({ id: parent.id }).comments(),
    rooms: (parent) => prisma.user({ id: parent.id }).rooms(),
    following: (parent) => prisma.user({ id: parent.id }).following(),
    followers: (parent) => prisma.user({ id: parent.id }).followers(),
    followingCount: (parent) => {
      const { id } = parent;
      return prisma
        .usersConnection({
          where: {
            followers_some: { id },
          },
        })
        .aggregate()
        .count();
    },
    followersCount: (parent) => {
      const { id } = parent;
      return prisma
        .usersConnection({
          where: {
            following_some: { id },
          },
        })
        .aggregate()
        .count();
    },
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [{ id: user.id }, { following_some: { id: parentId } }],
      });
    },
    isMyself: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
