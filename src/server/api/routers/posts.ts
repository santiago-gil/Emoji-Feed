import { type User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Create a router using the createTRPCRouter helper
 * Procedure --> method to generate a function that your client calls
 * Public  --> technically a procedure that anyone could call w/o being
 * authenticated. In this case, we should be able to see the posts, see the
 * home page, w/o having to sign in
 */

const filterUserForClient = (user: User) => {
  return { id: user.id, username: user.username, profileImageUrl: user.profileImageUrl }
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100
      })).map(filterUserForClient);

    return posts.map(post => {
      const author = users.find((user) => user.id === post.authorId)

      if (!author || !author.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found"
        })

      return {
        post,
        author: {
          ...author, username: author.username
        }
      }
    })
  }),
});
