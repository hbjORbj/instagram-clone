import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
    },
  },
};
