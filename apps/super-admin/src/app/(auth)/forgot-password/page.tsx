"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout, Button, Form, RHFInput } from "@commercex/ui";
import { forgotPasswordAction } from "../../../actions/auth.actions";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function SuperAdminForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema), defaultValues: { email: "" } });

  const onSubmit = (data: ForgotValues) => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setIsSubmitted(true); }, 1500);
  };

  return (
    <AuthLayout
      heading="Reset your password"
      description="Enter your email address and we will send you a link to reset your password."
      brandName="CommerceX Super Admin"
    >
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <div className="p-4 bg-primary/10 text-primary rounded-lg">Check your email for the reset link!</div>
          <Link href="/login">
            <Button variant="outline" className="w-full mt-4">Return to login</Button>
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}
          
            <RHFInput name="email" label="Email Address" inputProps={{ type: "email", placeholder: "admin@commercex.com", disabled: isLoading }} />
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center">
                <ArrowLeftIcon className="mr-1 h-3 w-3" /> Back to login
              </Link>
            </p>
          </form>
        </Form>
      )}
    </AuthLayout>
  );
}
