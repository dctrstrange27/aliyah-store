import { findUser } from "~/server/api/routers/findUser";
import { createTRPCRouter } from "~/server/api/trpc";
import { createUser } from "@/server/api/routers/createUser";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: findUser,
  create: createUser,
});

// export type definition of API
export type AppRouter = typeof appRouter;
