"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout, Button, Form, RHFInput } from "@commercex/ui";
import { Loader2Icon, CheckCircleIcon } from "lucide-react";

const inviteSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type InviteValues = z.infer<typeof inviteSchema>;

export default function SuperAdminInvitationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const form = useForm<InviteValues>({ resolver: zodResolver(inviteSchema), defaultValues: { password: "" } });

  const onSubmit = (data: InviteValues) => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setIsAccepted(true); }, 1500);
  };

  return (
    <AuthLayout
      heading="You've been invited!"
      description="Admin has invited you to join the CommerceX Platform Core team."
      brandName="CommerceX Super Admin"
    >
      {isAccepted ? (
        <div className="text-center space-y-4">
          <CheckCircleIcon className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-xl font-semibold">Welcome aboard</h2>
          <p className="text-sm text-muted-foreground">Your account has been created successfully.</p>
          <Link href="/login">
            <Button className="w-full mt-4">Proceed to Login</Button>
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-sm mb-4">
              <span className="text-muted-foreground">Email:</span> <span className="font-medium ml-2">new.admin@commercex.com</span>
            </div>
            <RHFInput name="password" label="Create Password" inputProps={{ type: "password", placeholder: "••••••••", disabled: isLoading }} />
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Accept Invitation & Join"}
            </Button>
          </form>
        </Form>
      )}
    </AuthLayout>
  );
}
