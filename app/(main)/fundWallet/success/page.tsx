"use client";
import { useVerifyTransaction } from "@/api/data/transactions";
import PageHeader from "@/components/shared/pageheader";
import { Button } from "@/components/ui/button";
import { TransactionResponse } from "@/types/transaction";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";

const Feedback = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const ref = useMemo(() => searchParams.get("reference"), [searchParams]);
  const { mutateAsync: verifyTransaction } = useVerifyTransaction();
  const [transaction, setTransaction] = useState<TransactionResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // verify transaction
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!ref || hasVerified.current) return;

    const confirmPayment = async () => {
      try {
        hasVerified.current = true;
        setLoading(true);
        const transactionData = await verifyTransaction(ref);
        setTransaction(transactionData);
        setSuccess(true);
      } catch (err) {
        console.error("Payment verification failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [ref]);

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

      <div className="flex flex-col justify-center items-center bg-[#EFEFF5] p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="flex gap-3 items-center">
              <RiLoader2Fill className="animate-spin text-3xl" />
              <p className="text-lg font-medium">Verifying Payment...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white shadow-md rounded-lg p-6 md:p-10 text-center max-w-md">
            <FaCheckCircle className="text-red-600 text-5xl mx-auto mb-4" />
            <h1 className="text-xl font-bold text-red-600">
              Top up was Unsuccessful
            </h1>
            <h3 className="text-lg font-semibold text-[#00005D]">
              ₦{transaction?.amount}
            </h3>
            <p className="mt-2">
              Your wallet top-up was unsuccessful.{" "}
              <span className="font-semibold">₦{transaction?.amount}</span> was
              not added to your wallet.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-4">
              <Button variant="secondary" asChild>
                <Link href="/complaints">Send us a message</Link>
              </Button>
              <Button
                className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition"
                asChild
              >
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        ) : success && transaction ? (
          <div className="bg-white shadow-md rounded-lg p-6 md:p-10 text-center max-w-md">
            <FaCheckCircle className="text-[#009900] text-5xl mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#00005D]">
              Top up was Successful
            </h1>
            <h3 className="text-lg font-semibold text-[#00005D]">
              ₦{transaction?.amount}
            </h3>
            <p className="mt-2">
              Your wallet top-up was successful.{" "}
              <span className="font-semibold">₦{transaction?.amount}</span> has
              been added to your wallet.
            </p>
            <Button
              className="bg-[#00005D] text-white font-semibold py-2 px-6 rounded-md mt-5 hover:bg-blue-800 transition"
              asChild
            >
              <Link href="/">Back to Dashboard</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Feedback;
