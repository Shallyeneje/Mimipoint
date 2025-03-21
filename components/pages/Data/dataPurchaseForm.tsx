"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DialogModal } from "@/components/shared/dialogModal";
import { FaCheckCircle } from "react-icons/fa";

export default function DataPurchaseForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const balance = 5000; // Mock balance (Replace with API call if needed)
  const product = "Airtel"; // Example product
  const cashback = amount ? Math.floor(parseFloat(amount) * 0.1) : 0; // 10% Cashback

  const validateInputs = () => {
    if (!amount) {
      setErrorMessage("Please select a data plan.");
      return false;
    }
    if (!phone.match(/^\d{10,11}$/)) {
      setErrorMessage("Please enter a valid phone number (10-11 digits).");
      return false;
    }
    setErrorMessage(""); // Clear error if all checks pass
    return true;
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    if (parseFloat(amount) > balance) {
      router.push("/buyData/insufficient-funds");
      return;
    }

    setIsModalOpen(true); // Show payment modal
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 2000);
  };

  return (
    <div className="mx-4 mt-14 w-full max-w-md p-4">
      <form onSubmit={handlePurchase}>
        {/* Amount Selection */}
        <label className="block text-[14px] font-medium text-[#00005D] mb-1">
          Amount
        </label>
        <select
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
        >
          <option value="" disabled>
            Other data offers
          </option>
          <option value="50">₦50</option>
          <option value="100">₦100</option>
          <option value="200">₦200</option>
          <option value="500">₦500</option>
          <option value="1000">₦1000</option>
          <option value="2000">₦2000</option>
          <option value="6000">₦6000</option>
        </select>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        {/* Phone Number Input */}
        <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">
          Phone number
        </label>
        <input
          type="tel"
          placeholder="08080982606"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
        />

        <button
          type="submit"
          className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900"
        >
          Purchase Data
        </button>
      </form>

      {/* Payment Modal */}
      <DialogModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={
          <p className="text-lg font-semibold text-center text-[#00005D] m-0 p-0">
            Data Subscription
          </p>
        }
        showFooter={false}
      >
        <p className="text-2xl font-bold text-center text-[#00005D] m-0 p-0">
          ₦{amount}
        </p>

        <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
          <span className="font-semibold">Product :</span>{" "}
          <span>{product}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Cashback :</span>
          <span className="text-[#00005D]">₦{cashback}</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-[6px] mt-3">
          <span className="text-gray-500">💳 Wallet</span>
          <span className="ml-auto font-semibold text-[#00005D]">
            ₦{balance}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <button
            className="w-full bg-[#00005D] text-white py-2 rounded-md hover:bg-blue-900 transition flex justify-center items-center"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
          <button
            className="w-full bg-[#E30B17] text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel Payment
          </button>
        </div>
      </DialogModal>

      {/* Success Modal */}
      <div className="w-64">
        <DialogModal open={isSuccessModalOpen} setOpen={setIsSuccessModalOpen} showFooter={false}>
          <div className="flex justify-center mb-2">
            <FaCheckCircle className="text-[#009900] text-5xl mx-auto mb-4" />
          </div>
          <p className="text-2xl font-bold text-center text-[#00005D]">₦{amount}</p>
          <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
            <span className="font-semibold">Product :</span> <span>{product}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Cashback :</span>
            <span className="text-[#00005D]">₦{cashback}</span>
          </div>
        </DialogModal>
      </div>
    </div>
  );
}
