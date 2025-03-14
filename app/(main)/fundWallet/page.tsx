"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { PaystackButton } from "react-paystack";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { DialogModal } from "@/components/shared/dialogModal";

const FundWallet = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [componentProps, setComponentProps] = useState<any>(null); // Corrected useState
  const disabled = !form.name || !form.email || !form.amount; // Fixed condition

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      toast.error("Payment configuration error. Public key is missing.");
      return;
    }

    // we send the form data to the server to generate a payment reference
    // and other details required to initialize the payment

    setComponentProps({
      email: form.email,
      amount: Number(form.amount) * 100, // Convert to kobo
      currency: "NGN",
      reference: `ref-${Date.now()}`, // Unique reference
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: form.name,
          },
        ],
      },
      publicKey,
      text: "Complete Payment",
      onSuccess: () =>
        router.push(`/fundWallet/success?reference=${"ref-" + Date.now()}`),
      onClose: () =>
        toast.error("Transaction was not completed, window closed."),
    });

    setShowPaymentConfirmation(true);
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
        <div className="bg-white m-5 rounded-lg p-10 w-full max-w-xl ">
          <h2 className="text-center text-xl font-bold mb-6">
            Complete Checkout
          </h2>

          {showPaymentConfirmation ? (
            <div className="space-y-4 text-center">
              <p>
                You are about to make a payment of
                <span className="font-bold mx-1.5">{form.amount}</span>
                NGN.
              </p>
              {componentProps && isClient && (
                <PaystackButton
                  {...componentProps}
                  className="w-full max-w-[70%] bg-[#00005D] text-white text-[14px] p-2 rounded-md hover:bg-blue-800 transition"
                />
              )}
            </div>
          ) : (
            <form className="flex m-6 flex-col gap-6 " onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                className="w-full bg-[#00005D] text-white text-[14px] p-2 rounded-md hover:bg-blue-800 transition h-[45px]"
                disabled={disabled}
              >
                Complete Payment
              </Button>
            </form>
          )}

          <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-sm">Powered by:</p>
            <Image
              src={"/images/paystack.png"}
              alt="Paystack Logo"
              width={120}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
