"use client";

import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { 
  AuthLayout,
  Button,
  Form,
  RHFInput
} from "@commercex/ui";
import { Loader2Icon, ShieldCheck } from "lucide-react";
import { verifyMfaAction } from "../../../actions/auth.actions";

const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits."),
});

type TwoFactorValues = z.infer<typeof twoFactorSchema>;

function TwoFactorContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const factorId = searchParams.get("factorId");

  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!factorId) {
      form.setError("root", { message: "Missing factor ID. Please try logging in again." });
      return;
    }
    
    setIsLoading(true);
    const result = await verifyMfaAction({ code: data.code, factorId });
    setIsLoading(false);
    
    if (result.error) {
      form.setError("root", { message: result.error });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <AuthLayout
      heading="Two-factor authentication"
      description="Enter the 6-digit code from your authenticator app to continue."
      brandName="CommerceX Super Admin"
    >
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}
          
          <RHFInput
            name="code"
            label="Authentication Code"
            inputProps={{
              placeholder: "000000",
              autoComplete: "one-time-code",
              maxLength: 6,
              className: "text-center tracking-[0.5em] text-lg font-mono",
              disabled: isLoading
            }}
          />

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Verify and sign in"
            )}
          </Button>
          
          <div className="mt-4 text-center">
            <button 
              type="button" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading}
            >
              Use a recovery code instead
            </button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}

export default function SuperAdminTwoFactorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    }>
      <TwoFactorContent />
    </Suspense>
  );
}
