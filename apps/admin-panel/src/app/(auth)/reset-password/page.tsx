"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout, Button, Form, RHFInput } from "@commercex/ui";
import { resetPasswordAction } from "../../../actions/auth.actions";
import { Loader2Icon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const resetSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type ResetValues = z.infer<typeof resetSchema>;

export default function TenantAdminResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ResetValues>({ resolver: zodResolver(resetSchema), defaultValues: { password: "", confirmPassword: "" } });

  const onSubmit = async (data: ResetValues) => {
    setIsLoading(true);
    const result = await resetPasswordAction({ password: data.password });
    setIsLoading(false);
    
    if (result.error) {
      form.setError("root", { message: result.error });
    } else {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout
        heading="Password reset successful"
        description="Your password has been successfully reset."
        brandName="CommerceX Merchant Dashboard"
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            You can now log in with your new password.
          </p>
          <Link href="/login" className="w-full">
            <Button className="w-full mt-4">
              Continue to log in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      heading="Create new password"
      description="Your new password must be different from previous used passwords."
      brandName="CommerceX Merchant Dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}
          
          <RHFInput name="password" label="New Password" inputProps={{ type: "password", placeholder: "••••••••", disabled: isLoading }} />
          <RHFInput name="confirmPassword" label="Confirm Password" inputProps={{ type: "password", placeholder: "••••••••", disabled: isLoading }} />
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
