"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { loadScript } from "../utils/loadScript"; // A utility function to load external scripts

const FundWallet = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure Paystack script is loaded
    await loadScript("https://js.paystack.co/v1/inline.js");

    const handler = (window as any).PaystackPop.setup({
      key: "your-public-key-here", // Replace with your Paystack public key
      email: form.email,
      amount: Number(form.amount) * 100, // Convert to kobo
      currency: "NGN",
      callback: function (response: any) {
        console.log("Payment successful:", response);
        router.push(`/feedback?amount=${form.amount}`); // Redirect with amount
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <div className="w-64 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FaHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Dashboard</h1>
      <p className="text-[16px] font-medium text-[#333385]">Welcome, Gozzy</p>

      <div className="flex justify-center items-center">
        <div className="bg-white m-5 rounded-lg p-10 w-full max-w-2xl ">
          <h2 className="text-center text-xl font-bold mb-6">Complete Checkout</h2>

          <form className="flex m-6 flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter your name"
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md border-[#8A8AB9] focus:ring focus:ring-blue-900 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md border-[#8A8AB9] focus:ring focus:ring-blue-900 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                placeholder="Enter amount"
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md border-[#8A8AB9] focus:ring focus:ring-blue-900 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00005D] text-white text-[14px] p-2 rounded-md hover:bg-blue-800 transition"
            >
              Complete Payment
            </button>
          </form>

          <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-sm">Powered by:</p>
            <Image src={"/images/paystack.png"} alt="Paystack Logo" width={120} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
