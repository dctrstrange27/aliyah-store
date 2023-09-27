import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import * as z from "zod";
import { Facebook, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import { Separator } from "~/components/ui/separator";

const signin = () => {
  const [isMount, setIsMount] = useState(false);
  
  useEffect(() => {
    setIsMount(true);
  }, []);

  const formSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required.",
    }),
    password: z.string().min(1, {
      message: "Password is required.",
    }),
  });
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!isMount) {
    return null;
  }
  return (
    <div>
      <Dialog open>
        <DialogContent className="overflow-hidden bg-white p-0 text-black">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center text-2xl font-bold">
              Welcome to Aliya Store
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your credentials and create your account with a username and
              password. You can edit and change it later.
            </DialogDescription>
            <Button onClick={handleGoogleLogin}>
              <Mail className="mr-2 h-4 w-4" /> Login with gmail
            </Button>
          
            <div className="flex w-full items-center justify-center space-x-5">
              <Separator className="w-[20%] text-center"></Separator>
              <p>or</p>
              <Separator className="w-[20%] text-center"></Separator>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 pb-10 border-[1px"
              >
                <div className="space-y-8 px-6 ">
                  <div className="flex items-center justify-center text-center"></div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Enter email"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Enter password"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                 
                    <Button className="w-full">login</Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default signin;
