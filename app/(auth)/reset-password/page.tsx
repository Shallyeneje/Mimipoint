"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        toast.success("Password reset successful");
        router.push("/Welcome");
      }, 3000);
    } catch (err: any) {
      toast.error("An error just occurred!, please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid md:grid-cols-2 h-screen bg-white">
      {/* Left Section - Image */}
      <div className="hidden md:block bg-white ">
        <img
          src="/images/forgotPassword.png"
          alt="User login"
          className="w-full object-cover object-top h-screen"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex justify-center items-center">
        <div className="w-full md:w-[60%] space-y-4 relative">
          <h1 className="text-2xl font-bold text-[#00005D] mb-6">
            Enter a new password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white">
            {/* Password Input */}
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm">Confirm Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D]"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00005D] text-white py-2 rounded-sm font-semibold hover:bg-blue-900 transition"
              disabled={loading}
            >
              Submit
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-sm text-left font-semibold">
            <a
              href="/sign-in"
              className="text-[#E88B2E] font-medium hover:underline"
            >
              Continue with Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
