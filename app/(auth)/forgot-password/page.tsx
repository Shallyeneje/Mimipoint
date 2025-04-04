"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import PasswordInput from "@/components/pages/auth/password-input";
import { CgSpinner } from "react-icons/cg";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }
    setLoading(true);
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        toast.success("Password reset code sent to your email!");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        toast.error(err.errors[0].longMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          toast.success("Password reset successful!");
          router.push("/");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        toast.error(err.errors[0].longMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="grid md:grid-cols-2 h-screen bg-white">
      {/* Left Section - Image */}
      <div className="hidden md:block bg-white ">
        <img
          src="/images/forgotPassword.png"
          alt="User login"
          className="w-full object-cover object-top h-screen "
        />
      </div>

      <div className="flex justify-center items-center pt-[120px]">
        <div className="w-full md:w-[60%] space-y-4">
          <h1 className="text-2xl font-bold text-[#00005D] mb-5">
            Forgot Password?
          </h1>
          <form
            onSubmit={!successfulCreation ? create : reset}
            className="space-y-6 bg-white"
          >
            {!successfulCreation && (
              <>
                <div>
                  <Label htmlFor="email">Provide your email address</Label>
                  <Input
                    type="email"
                    className="mt-1"
                    placeholder="e.g john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!email || loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <CgSpinner className="animate-spin" />
                      Sending code...
                    </span>
                  ) : (
                    "Send password reset code"
                  )}
                </Button>
              </>
            )}

            {successfulCreation && (
              <>
                <div>
                  <Label htmlFor="code">
                    Enter the password reset code that was sent to your email
                  </Label>
                  <Input
                    placeholder="e.g 123456"
                    className="mt-1"
                    id="code"
                    type="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Enter your new password</Label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g *********"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Enter your new password</Label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="e.g *********"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    loading ||
                    !code ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <CgSpinner className="animate-spin" />
                      Resetting password...
                    </span>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </>
            )}

            {secondFactor && (
              <p>2FA is required, but this UI does not handle that</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
