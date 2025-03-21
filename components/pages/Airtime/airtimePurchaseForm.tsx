"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DialogModal } from "@/components/shared/dialogModal";

export default function AirtimePurchaseForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountError, setAmountError] = useState(""); // Error state for amount
  const [phoneError, setPhoneError] = useState(""); // Error state for phone number
  const router = useRouter();

  const balance = 5000; // Mock balance (Replace with API call if needed)
  const product = "Airtel"; // Example product
  const cashback = amount ? Math.floor(parseFloat(amount) * 0.1) : 0; // 10% Cashback

  const validateInputs = () => {
    let isValid = true;

    // Validate amount
    const amountValue = parseFloat(amount);
    if (!amount || amountValue <= 0) {
      setAmountError("Please enter a valid amount.");
      isValid = false;
    } else {
      setAmountError("");
    }

    // Validate phone number
    const phonePattern = /^[0-9]{11}$/; // Ensures exactly 11 digits
    if (!phone || !phonePattern.test(phone)) {
      setPhoneError("Please enter a valid 11-digit phone number.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    if (parseFloat(amount) > balance) {
      router.push("/buyAirtime/insufficient-funds");
      return;
    }

    setIsModalOpen(true); // Show modal on success
  };

  return (
    <div className="mx-4 mt-2 w-full max-w-md p-4">
      <form onSubmit={handlePurchase}>
        {/* Amount Input */}
        <label className="block text-[14px] font-medium text-[#00005D] mb-1">
          Amount
        </label>

        {/* Amount Error Message */}
        {amountError && <p className="text-red-600 text-sm mb-1">{amountError}</p>}

        <input
          type="number"
          placeholder="50-50000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full p-2 border ${
            amountError ? "border-red-500" : "border-[#8A8AB9]"
          } bg-white rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900`}
        />

        {/* Phone Number Input */}
        <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">
          Phone number
        </label>

        {/* Phone Error Message */}
        {phoneError && <p className="text-red-600 text-sm mb-1">{phoneError}</p>}

        <input
          type="tel"
          placeholder="08080982606"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`w-full p-2 border ${
            phoneError ? "border-red-500" : "border-[#8A8AB9]"
          } bg-white rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900`}
        />

        <button
          type="submit"
          className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900"
        >
          Purchase Airtime
        </button>
      </form>

      {/* Payment Details Modal */}
      <DialogModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={
          <p className="text-lg font-semibold text-center text-[#00005D] m-0 p-0">
            Airtime Purchase
          </p>
        }
        showFooter={false}
      >
        {/* Amount Display */}
        <p className="text-2xl font-bold text-center text-[#00005D] m-0 p-0">₦{amount}</p>

        {/* Product and Cashback Details */}
        <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
          <span className="font-semibold">Product :</span> <span>{product}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Cashback :</span>
          <span className="text-[#00005D]">₦{cashback}</span>
        </div>

        {/* Wallet Balance */}
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-[6px] mt-3">
          <span className="text-gray-500">💳 Wallet</span>
          <span className="ml-auto font-semibold text-[#00005D]">₦{balance}</span>
        </div>

        {/* Buttons */}
        <div className="mt-3 space-y-2">
          <button className="w-full bg-[#00005D] text-white py-2 rounded-md hover:bg-blue-900 transition">
            Complete Payment
          </button>
          <button
            className="w-full bg-[#E30B17] text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel Payment
          </button>
        </div>
      </DialogModal>
    </div>
  );
}
