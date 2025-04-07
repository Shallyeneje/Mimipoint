"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <AuthenticateWithRedirectCallback
      continueSignUpUrl="/sign-up/complete-oauth"
      signInFallbackRedirectUrl="/sign-in/complete-oauth"
    />
  );
}
