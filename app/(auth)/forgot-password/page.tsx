"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react"; // Importing success icon

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call (replace with actual request if needed)
    setTimeout(() => {
      setSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(false), 3000);
    }, 500);
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
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 border border-[#D9FFD9] text-[#009900] px-4 py-3 rounded-md flex items-start gap-2 text-sm shadow-md mb-4">
              <CheckCircle className="w-5 h-5 text-[#009900] mt-0.5" />
              <div>
                <p className="font-bold">Success</p>
                <p>
                  Password reset link has been sent to your email, kindly check
                  your inbox.
                </p>
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-[#00005D] mb-6">
            Enter your email
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00005D] text-white py-2 rounded-sm font-semibold hover:bg-blue-900 transition"
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
}
