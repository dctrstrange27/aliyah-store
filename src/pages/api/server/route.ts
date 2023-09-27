import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(req: Request) {
    try {
    const {email} = await req.json()

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    return NextResponse.json(user);
    } catch (error) {
        console.log(error)   
    }
  }