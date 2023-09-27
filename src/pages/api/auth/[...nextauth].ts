import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  sesssion:{
    strategy:"jwt"
  },
  providers: [
 
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      name: "sign in to Aliya store",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const userExist = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        console.log("userExist", userExist);
        if (!userExist || password !== "1234") {
            return null
        }
        console.log(userExist)
        return userExist
      },
    }),
  ],
  pages:{
    signIn:'/auth/signin'
  }
};
export default NextAuth(authOptions);
