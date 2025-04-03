"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { OAuthStrategy } from "@clerk/types";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");

  const [password, setPassword] = useState("");
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login Successful!");
        router.push("/");
      } else {
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      console.error("error", err.errors[0].message);
      toast.error(err.errors[0].message);
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
          src="/images/loginImage.png"
          alt="User login"
          className="w-full object-cover object-top h-screen "
        />
      </div>

      {/* Right Section - Login Form */}
      <ScrollArea className="h-screen">
        <div className="flex justify-center pt-[120px]">
          <div className="w-full md:w-[60%] space-y-4">
            <h1 className="text-2xl font-bold text-[#00005D] mb-6">
              Login to Continue
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white">
              {/* Email Input */}
              <div>
                <label className="block text-sm ">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D] outline-none"
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm ">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D] outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-left text-sm ">
                <a
                  href="/forgot-password"
                  className="text-[#00005D] font-semibold hover:underline"
                >
                  forgot password
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00005D] text-white py-2 rounded-sm font-semibold hover:bg-blue-900 transition"
              >
                submit
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-[#333385]"></div>
              <span className="mx-3 text-sm text-[#333385]">
                or Continue with
              </span>
              <div className="flex-1 border-t border-[#333385]"></div>
            </div>

            {/* Google Sign-In */}
            <button
              className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-[6px] font-semibold  hover:bg-gray-100 cursor-pointer text-[#00005D]"
              onClick={() => signInWith("oauth_google")}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Google
            </button>

            {/* Register Link */}
            <p className="mt-4 text-sm text-left font-semibold ">
              Don’t have an account?{" "}
              <a
                href="/sign-up"
                className="text-[#E88B2E] font-medium hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
