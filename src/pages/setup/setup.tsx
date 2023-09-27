import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

const Setup = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session?.user)
    if (status === "unauthenticated") signIn();
  }, [status]);

  const find = api.user.find.useMutation();
  const sample = async () => {
    const data = await find.mutateAsync({ email: "dctrrohan@gmail.com" });
    console.log(data);
  };

  return (
    <div>
      <h1>Welcome </h1>
      <Button onClick={() => sample()}>test</Button>
      <Button onClick={() => signOut()}>signOut</Button>
    </div>
  );
};

export default Setup;
