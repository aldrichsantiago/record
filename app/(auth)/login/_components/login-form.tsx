"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * 🔥 TanStack Query Mutation
   */
  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      return res.json();
    },
  });

  function onSubmit(data: FormData) {
    const promise = loginMutation.mutateAsync(data);

    toast.promise(promise, {
      loading: "Logging in...",
      success: "Login successful 🎉",
      error: (err) => err.message || "Invalid credentials",
      position: "top-center"
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your ReCord account
                </p>
              </div>

              {/* EMAIL */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Password
                      </FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* SUBMIT */}
              <Field>
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </Field>

              {loginMutation.isError && (
                <p className="text-sm text-center text-red-500">
                  Invalid credentials. Please try again.
                </p>
              )}

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* IMAGE SIDE */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={"./bnw_reCord.png"}
              alt="Image"
              className="absolute inset-0 p-24 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-gray-50 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}