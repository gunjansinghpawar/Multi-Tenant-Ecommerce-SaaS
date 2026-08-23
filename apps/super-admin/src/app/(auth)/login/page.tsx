"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  AuthLayout,
  Button,
  Form,
  RHFInput,
  useToast
} from "@commercex/ui";
import { Loader2Icon } from "lucide-react";
import { loginAction } from "../../../actions/auth.actions";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function SuperAdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const result = await loginAction(data);
    setIsLoading(false);
    if (result.error) {
      form.setError("root", { message: result.error });
    } else {
      toast({
        title: "Authentication Successful",
        description: "Welcome back, Admin.",
      });
      router.replace("/");
    }
  };

  return (
    <AuthLayout
      heading="Platform Administration"
      description="Secure authentication required to access the CommerceX orchestration layer."
      brandName="CommerceX Super Admin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}

          <RHFInput
            name="email"
            label="Email Address"
            inputProps={{
              type: "email",
              placeholder: "admin@commercex.com",
              autoComplete: "email",
              disabled: isLoading
            }}
          />

          <div className="space-y-1">
            <RHFInput
              name="password"
              label="Password"
              inputProps={{
                type: "password",
                placeholder: "••••••••",
                autoComplete: "current-password",
                disabled: isLoading
              }}
            />
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="pt-2">
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Authenticate"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
