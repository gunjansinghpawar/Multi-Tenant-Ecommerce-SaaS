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
import { Loader2Icon, UserPlus } from "lucide-react";

const invitationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type InvitationValues = z.infer<typeof invitationSchema>;

export default function StorefrontInvitationPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InvitationValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (data: InvitationValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <AuthLayout
      heading="Accept invitation"
      description="You've been invited to join CommerceX Store. Set up your account to accept."
      brandName="CommerceX Store"
    >
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <UserPlus className="h-6 w-6" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 space-y-2">
            <div className="text-sm font-medium">Email Address</div>
            <div className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">
              invited.user@example.com
            </div>
          </div>

          <RHFInput
            name="name"
            label="Full Name"
            inputProps={{
              placeholder: "John Doe",
              autoComplete: "name",
              disabled: isLoading
            }}
          />

          <RHFInput
            name="password"
            label="Create Password"
            inputProps={{
              type: "password",
              placeholder: "••••••••",
              autoComplete: "new-password",
              disabled: isLoading
            }}
          />

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Accept invitation"
            )}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By accepting this invitation, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
