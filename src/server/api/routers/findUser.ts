import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const findUser = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  find: publicProcedure
  .input(z.object({email: z.string()}))
  .mutation(async({input, ctx})=>{
     const user = await ctx.db.user.findUnique({
        where:{
          email:input.email
        }
      })
      return user
  })
});



