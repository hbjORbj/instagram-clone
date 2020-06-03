import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: (parent) => prisma.post({ id: parent.id }).files(),
    comments: (parent) => prisma.post({ id: parent.id }).comments(),
    user: (parent) => prisma.post({ id: parent.id }).user(),
    likes: (parent) => prisma.post({ id: parent.id }).likes(),
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
    likeCount: (parent) => {
      const { id } = parent;
      return prisma
        .likesConnection({
          where: {
            post: { id },
          },
        })
        .aggregate()
        .count();
    },
  },
};
