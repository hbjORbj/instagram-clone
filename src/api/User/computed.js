import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
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
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id: postId } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id: postId,
            },
          },
        ],
      });
    },
  },
};
