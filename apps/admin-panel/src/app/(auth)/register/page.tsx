"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout, Button, Form, RHFInput } from "@commercex/ui";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function TenantAdminRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (data: RegisterValues) => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); window.location.href = "/login"; }, 1500);
  };

  return (
    <AuthLayout
      heading="Create your account"
      description="Register as a Tenant Admin to manage the CommerceX ecosystem."
      brandName="CommerceX Merchant Dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}
          
          <RHFInput name="name" label="Full Name" inputProps={{ placeholder: "John Doe", disabled: isLoading }} />
          <RHFInput name="email" label="Email Address" inputProps={{ type: "email", placeholder: "admin@commercex.com", disabled: isLoading }} />
          <RHFInput name="password" label="Password" inputProps={{ type: "password", placeholder: "••••••••", disabled: isLoading }} />
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center">Sign In <ArrowRightIcon className="ml-1 h-3 w-3" /></Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}
