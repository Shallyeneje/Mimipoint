"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { getUserTokenByEmail } from "@/api/data/users";
import { saveToken } from "@/utils";

export default function SSOCallbackPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleSSOCallback = async () => {
      if (!isLoaded || !user) return;

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return;

      try {
        const userToken = await getUserTokenByEmail(email);
        if (userToken) {
          saveToken(userToken); // Save token to cookies or localStorage
        }

        router.push("/"); // Redirect to home or dashboard
      } catch (error) {
        console.error("Token fetch failed", error);
        router.push("/error");
      }
    };

    handleSSOCallback();
  }, [isLoaded, user, router]);

  return <AuthenticateWithRedirectCallback />;
}
