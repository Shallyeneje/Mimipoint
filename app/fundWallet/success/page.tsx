"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const Feedback = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0"; // Get amount from query params
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-5">
      <div className="w-64 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FaHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-3xl font-bold text-[#00005D] mt-3">Dashboard</h1>
      <p className="text-[16px] font-medium text-[#333385]">Welcome, Gozzy</p>

      <div className="flex flex-col justify-center items-center bg-[#EFEFF5] p-4">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-10 text-center max-w-md">
          <FaCheckCircle className="text-[#009900] text-5xl mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#00005D]">Top up was Successful</h1>
          <h3 className="text-lg font-semibold text-[#00005D]">₦{amount}</h3>
          <p className="mt-2">
            Your wallet top-up was successful. <span className="font-semibold">₦{amount}</span> has been added to your account.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#00005D] text-white font-semibold py-2 px-6 rounded-md mt-5 hover:bg-blue-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
