import { clerkClient } from "@clerk/nextjs";
import type { Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

const addUserDataToPosts = async (posts: Post[]) => {
    const users = (await clerkClient.users.getUserList({
        userId: posts.map(post => post.authorId),
        limit: 100,
    })).map(filterUserForClient);

    return posts.map((post) => {
        const author = users.find((user) => user.id === post.authorId)
        if (!author) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Author for post not found" })

        return {
            post,
            author: {
                ...author,
                username: author.username ?? "anonymous"
            },
        }
    })
}

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    analytics: true,
});

export const postsRouter = createTRPCRouter({

    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const post = await ctx.prisma.post.findUnique({ where: { id: input.id } })
        if (!post) throw new TRPCError({ code: "NOT_FOUND" })

        return (await addUserDataToPosts([post]))[0]
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: [{ createdAt: 'desc' }]
        });
        return addUserDataToPosts(posts);
    }),

    getPostsByUserId: publicProcedure.input(z.object({
        userId: z.string(),
    })).query(({ ctx, input }) => ctx.prisma.post.findMany({ where: { authorId: input.userId }, take: 100, orderBy: { createdAt: "desc" } }).then(addUserDataToPosts)),

    create: privateProcedure.input(z.object({
        content: z.string().min(1, 'Please provide an emoji').emoji("Only emojies are allowed").max(5, "Please provide less than 6 emojies")
    })).mutation(async ({ ctx, input }) => {
        const authorId = ctx.userId;
        const { success } = await ratelimit.limit(authorId)

        // If the user has reached the rate limit, throw an error
        if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "You have reached your sending limit, please try again in 1 minute" })

        const post = await ctx.prisma.post.create({
            data: {
                authorId,
                content: input.content,
            }
        })
        return post
    }),
});
