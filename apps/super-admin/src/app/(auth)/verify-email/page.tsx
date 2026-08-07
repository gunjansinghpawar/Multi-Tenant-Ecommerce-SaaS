"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthLayout, Button } from "@commercex/ui";
import { verifyEmailAction } from "../../../actions/auth.actions";
import { Loader2Icon, MailOpen, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("token_hash");
  const email = searchParams.get("email");
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current) return;
    
    if (!token || !email) {
      setStatus("error");
      return;
    }
    
    hasAttempted.current = true;
    
    const verify = async () => {
      const result = await verifyEmailAction({ token, email });
      if (result.error) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    };
    
    verify();
  }, [token, email]);

  return (
    <AuthLayout
      heading={
        status === "verifying" 
          ? "Verifying your email" 
          : status === "success" 
            ? "Email verified!" 
            : "Verification failed"
      }
      description={
        status === "verifying"
          ? "Please wait while we verify your email address..."
          : status === "success"
            ? "Your email has been successfully verified."
            : "The verification link has expired or is invalid."
      }
      brandName="CommerceX Super Admin"
    >
      <div className="flex flex-col items-center justify-center space-y-6 py-6">
        {status === "verifying" && (
          <div className="relative">
            <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center">
              <MailOpen className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <Loader2Icon className="h-6 w-6 text-primary absolute -bottom-2 -right-2 animate-spin" />
          </div>
        )}

        {status === "success" && (
          <>
            <div className="h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Thank you for verifying your email address. Your account is now active.
            </p>
            <Link href="/login" className="w-full">
              <Button className="w-full mt-4">
                Continue to log in <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="h-20 w-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-2">
              <XCircle className="h-10 w-10" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              We couldn't verify your email. Please request a new verification link.
            </p>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full mt-4">
                Return to log in
              </Button>
            </Link>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export default function SuperAdminVerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
