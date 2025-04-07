"use client";
import { generateRandomPassword, saveToken } from "@/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCreateUser } from "@/api/data/users";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";

const Oauthcompletionpage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { mutateAsync: createUser } = useCreateUser();
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
        const new_user = await createUser({
          email: email,
          first_name: user.firstName || "",
          last_name: user.lastName || "",
          password: generateRandomPassword(8),
          oauth_provider: "google",
          email_is_verified: true,
          is_staff: false,
          role: "customer",
        });
        if (new_user) {
          saveToken({
            token: new_user.token,
            user_id: new_user.user_id,
            user_email: email,
          }); // Save token to cookies or localStorage
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
        <h1 className="text-2xl font-bold">Completing Setup...</h1>
      </div>
      <p className="mt-2 text-gray-600">
        Please wait while we set up your account.
      </p>
    </div>
  );
};

export default Oauthcompletionpage;
