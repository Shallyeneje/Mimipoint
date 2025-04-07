"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import PageHeader from "@/components/shared/pageheader";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import {
  useCreateTransaction,
  useGetWalletByType,
  useGetWallets,
} from "@/api/data/transactions";
import { TransactionResponse, WalletResponse } from "@/types/transaction";
import { getUserId } from "@/utils";

const PaystackButton = dynamic(
  () => import("@/components/shared/paystack-button"),
  {
    ssr: false,
  }
);

const FundWallet = () => {
  const { user } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [componentProps, setComponentProps] = useState<any>(null); // Corrected useState
  const disabled = !form.name || !form.email || !form.amount; // Fixed condition
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const { data: wallets } = useGetWalletByType("naira") as {
    data: WalletResponse[];
  };
  const user_id = getUserId();
 

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setForm({
      name: user?.firstName || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      amount: "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user_id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    if (!publicKey) {
      toast.error("Payment configuration error. Public key is missing.");
      return;
    }

    try {
      // create a transaction on the server
      const transactionData = (await createTransaction({
        amount: Number(form.amount), // Convert to kobo
        status: "pending",
        user_id: user_id,
        wallet_id: wallets[0]?.id,
        transaction_type: "topup",
      })) as TransactionResponse;

      setComponentProps({
        email: form.email,
        amount: Number(transactionData.amount) * 100, // Convert to kobo
        currency: "NGN",
        reference: transactionData.reference,
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
          router.push(
            `/fundWallet/success?reference=${transactionData.reference}`
          ),
        onClose: () =>
          toast.error("Transaction was not completed, window closed."),
      });

      setShowPaymentConfirmation(true);
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("An error occurred while creating the transaction.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-4">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Dashboard"
        description={
          user?.firstName
            ? `Welcome, 
            ${user?.firstName} ${user?.lastName}
            `
            : ""
        }
      />

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
