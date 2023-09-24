"use client"
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
export default function Home() {
  const { data: session,status } = useSession();
  console.log(session?.user)
  useEffect(()=>{
      if(status === "unauthenticated"){
        signIn()
      }
  },[status])
  
  return (
      <div>
          <h1>Welcome </h1>
          <div className="flex items-center p-2 space-x-3">
              {session ? <Image
                  src={session?.user?.image as string}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-8 h-8 rounded-full"
              ></Image> :""}
              <p>{session?.user?.name}</p>
          </div>
          <Button onClick={() => signOut()}>signOut</Button>
         
      </div>
  );
}
