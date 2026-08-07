"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  AuthLayout,
  Button,
  Form,
  RHFInput
} from "@commercex/ui";
import { Loader2Icon, ArrowLeftIcon, CheckCircle2 } from "lucide-react";
import { forgotPasswordAction } from "../../../actions/auth.actions";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function StorefrontForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        heading="Check your email"
        description="We have sent a password recovery link to your email."
        brandName="CommerceX Store"
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-sm">
            If an account exists for <span className="font-medium text-foreground">{form.getValues().email}</span>, you will receive an email with instructions on how to reset your password in a few minutes.
          </p>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full mt-4">
              Return to log in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      heading="Forgot password"
      description="No worries, we'll send you reset instructions."
      brandName="CommerceX Store"
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
              placeholder: "customer@example.com",
              autoComplete: "email",
              disabled: isLoading
            }}
          />

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Reset password"
            )}
          </Button>
          
          <div className="flex justify-center mt-6">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline inline-flex items-center transition-colors">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
