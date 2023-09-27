import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const findUser = createTRPCRouter({
  createUser: publicProcedure
  .input(z.object({email: z.string(), name: z.string(), emailVerified:z.boolean(),image:z.string()}))
  
  .mutation(async({input, ctx})=>{
    const userExist = await ctx.db.user.findUnique({
        where:{
            email:input.email,
            name: input.name,
            image:input.image,
            emailVerified:input.emailVerified,
        }
    })

    if(userExist){
        return null
    }
    const newUser = await ctx.db.user.create({
        data:{
          email:input.email
        }
      })
      return newUser
  })
});



