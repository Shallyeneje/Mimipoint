"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { OAuthStrategy } from "@clerk/types";
import PasswordInput from "@/components/pages/auth/password-input";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  // sign up flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signUp.create({
        firstName: firstname,
        lastName: lastname,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("Account created Successfully");
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast.error(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // verification
  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!signUp) {
      toast.error("Sign-up session is missing.");
      return;
    }

    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        toast.error("Verification incomplete. Please try again.");
        return;
      }

      await setActive({ session: completeSignUp.createdSessionId });
      toast.success("Email verified successfully!");
      router.push("/");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast.error(err.errors?.[0]?.message || "Verification failed.");
    } finally {
      setLoading(false); // ✅ Stops endless loading
    }
  };

  // sign in with Oauth
  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) return null;
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  return (
    <div className="grid md:grid-cols-2 h-screen bg-white">
      {/* Left Section - Image */}
      <div className="hidden md:block bg-white ">
        <img
          src="/images/registerImage.png"
          alt="User login"
          className="w-full object-cover object-top h-screen"
        />
      </div>

      {/* Right Section - Register Form */}
      <ScrollArea className="h-screen">
        <div className="flex justify-center py-[89px]">
          <div className="w-full md:w-[60%] space-y-4">
            <h1 className="text-2xl font-bold text-[#00005D] mb-6">
              Register to get Started
            </h1>

            {!pendingVerification ? (
              <form onSubmit={handleSubmit} className="space-y-5 bg-white">
                <div className="flex gap-3 w-full">
                  {/* firstname */}
                  <div className="flex-1">
                    <Label className="">Firstname</Label>
                    <Input
                      type="text"
                      className=""
                      placeholder="Enter your Firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                  {/* lastname */}
                  <div className="flex-1">
                    <Label className="">Lastname</Label>
                    <Input
                      type="text"
                      className=""
                      placeholder="Enter your Lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <Label className="">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Label className="">Password</Label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <Label className="">Confirm Password</Label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full my-2"
                  disabled={
                    loading ||
                    firstname.trim() === "" ||
                    lastname.trim() === "" ||
                    emailAddress.trim() === "" ||
                    password.trim() === "" ||
                    confirmPassword.trim() === "" ||
                    password !== confirmPassword
                  }
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <CgSpinner className="animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={onPressVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading || code === ""}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <CgSpinner className="animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </form>
            )}

            {!pendingVerification && (
              <>
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-[#333385]"></div>
                  <span className="mx-3 text-sm text-[#333385]">
                    or Continue with
                  </span>
                  <div className="flex-1 border-t border-[#333385]"></div>
                </div>

                {/* Google Sign-In */}
                <button
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-[6px] font-semibold hover:bg-gray-100 text-[#00005D]"
                  onClick={() => signInWith("oauth_google")}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    className="w-5 h-5"
                  />
                  Google
                </button>
              </>
            )}

            {/* Login Link */}
            <p className="mt-4 text-sm text-left font-semibold">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="text-[#E88B2E] font-medium hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
