"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/context/UserContext"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useUser(); // Get login from context
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await fetch("https://your-api-url.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!res.ok) {
        throw new Error("Registration failed! Please try again.");
      }

      const data = await res.json(); // Assuming API returns data like { username, token }
      
      
      // Save user data to context and localStorage
      login({ username, email, token: data.token });

      router.push("/Welcome");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white">
        <img
          src="/images/registerImage.png"
          alt="User login"
          className="w-fit h-auto object-cover"
        />
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-12 py-16">
        <h1 className="text-2xl font-bold text-[#00005D] mb-6">Register to get Started</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {/* Username Input */}
          <div>
            <label className="block text-sm">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border text-xs rounded-[6px] border-[#8A8AB9] focus:ring-[#00005D] focus:border-[#00005D]"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm">Email</label>
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

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-[#333385]"></div>
          <span className="mx-3 text-sm text-[#333385]">or Continue with</span>
          <div className="flex-1 border-t border-[#333385]"></div>
        </div>

        {/* Google Sign-In */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-[6px] font-semibold hover:bg-gray-100">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Google
        </button>

        {/* Login Link */}
        <p className="mt-4 text-sm text-left font-semibold">
          Already have an account?{" "}
          <a href="/Login" className="text-[#E88B2E] font-medium hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
