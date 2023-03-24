import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Create a router using the createTRPCRouter helper
 * Procedure --> method to generate a function that your client calls
 * Public  --> technically a procedure that anyone could call w/o being
 * authenticated. In this case, we should be able to see the posts, see the
 * home page, w/o having to sign in
 */

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
