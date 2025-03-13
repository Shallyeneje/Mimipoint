"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white ">
        <img
          src="/images/loginImage.png"
          alt="User login"
          className="w-fit h-9/12 object-cover "
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-12 ">
        <h1 className="text-2xl font-bold text-[#00005D] mb-6">
          Login to Continue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {/* Email Input */}
          <div>
            <label className="block text-sm ">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm ">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-left text-sm ">
            <a
              href="/forgotPassword"
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
          <span className="mx-3 text-sm text-[#333385]">or Continue with</span>
          <div className="flex-1 border-t border-[#333385]"></div>
        </div>

        {/* Google Sign-In */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-[6px] font-semibold  hover:bg-gray-100">
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
          <a href="/register" className="text-[#E88B2E] font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
