"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminAuth } from "../api/use-auth";
import { loginSchema } from "../../admin/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useAdminAuth();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    mutate(
      {
        json: data,
      },
      {
        onSuccess: () => {
          toast.success("Log In..");
          router.push("/admin");
        },
        onError: () => {
          toast.error("Invalid Credentials.....");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
      <div className="w-full max-w-sm bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-zinc-400 text-sm">
            Welcome back! Please enter your admin credentials to access the
            dashboard.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      type="email"
                      autoComplete="email"
                      {...field}
                      className="rounded-lg border-zinc-700 bg-zinc-800 text-white focus:border-blue-500 focus:ring-blue-500 placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-200">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                      className="rounded-lg border-zinc-700 bg-zinc-800 text-white focus:border-blue-500 focus:ring-blue-500 placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
            >
              {isPending ? "Verifying..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-8 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Notion Admin Panel. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}
