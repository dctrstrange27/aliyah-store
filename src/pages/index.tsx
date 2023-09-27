import { signIn, signOut, useSession } from "next-auth/react";
import Setup from "./setup/setup";

export default function Home () {
    return <Setup/>
}
