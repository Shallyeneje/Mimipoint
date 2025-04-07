"use client";
import { saveToken } from "@/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getUserTokenByEmail } from "@/api/data/users";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";

const Oauthcompletionpage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  const Logout = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleOauthCompletion = async () => {
      if (!isLoaded || !user) return;

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return;

      try {
        const user_token = await getUserTokenByEmail(email);
        if (user_token) {
          saveToken(user_token);
        }
        router.push("/"); // Redirect to home or dashboard
      } catch (error) {
        console.error("Token fetch failed", error);
        toast.error("Token fetch failed, please try again.");
        await Logout();
      }
    };

    handleOauthCompletion();
  }, [isLoaded, user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CgSpinner className="animate-spin" size={30} />
        <h1 className="text-2xl font-bold">Completing Login...</h1>
      </div>
      <p className="mt-2 text-gray-600">
        Please wait while we set up your account.
      </p>
    </div>
  );
};

export default Oauthcompletionpage;
