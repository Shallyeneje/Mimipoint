"use client";
import React, { useState, useEffect } from "react";
import { PhoneCallIcon, ChevronDown } from "lucide-react";
import { CheckCircle, Wallet } from "lucide-react";
import { FiWifi, FiHome, FiTv, FiCreditCard } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { DialogModal } from "@/components/shared/dialogModal";
import BundleTabs from "./bundleTabs";
import Image from "next/image";
import PageHeader from "@/components/shared/pageheader";
import { FaHome } from "react-icons/fa";

const data = [
  {
    name: "GOTV",
    description: "everywhere you go",
    img: "/images/Gotv logo 1.png",
    color: "#00005D",
    nameColor: "#00005D", // GOTV
    bg: "white",
  },
  {
    name: "DSTV",
    description: "smartphone network",
    img: "/images/DSTV Logo.png",
    color: "#00005D",
    nameColor: "#00005D", // Airtel Red
    bg: "white",
  },
  {
    name: "Startimes",
    description: "here for you",
    img: "/images/startimes-logo 1.png",
    color: "#00005D",
    nameColor: "#00005D", // 9mobile Green
    bg: "white",
  },
];

export default function CableDashboard() {
  const [selected, setSelected] = useState<string | null>("GOTV"); // Default active service

  const [clicked, setClicked] = useState("daily");
  const [smartcard, setSmartcard] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedBundle, setSelectedBundle] = useState<{
    bundle: string;
    Amount: string;
  } | null>(null);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(() =>
    data.find((item) => item.name === "GOTV")
  );

  // Mock API Call - Replace with your actual API call
  const fetchBeneficiaries = async () => {
    // Simulating an API request
    setTimeout(() => {
      setBeneficiaries([
        "John Doe - 123456",
        "Jane Smith - 789012",
        "Peter Parker - 345678",
      ]);
    }, 1000);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      fetchBeneficiaries(); // Fetch data only when opening dropdown
    }
  };
  const handlePayment = async () => {
    if (!smartcard || !selectedBundle) {
      setErrorMessage(
        "Please enter your SmartCard number and select a bundle."
      );
      return;
    }

    setIsPaying(true);
    setErrorMessage("");

    // Simulate an API call with a delay
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true); // Show success modal
      setSelectedBundle(null); // Close payment modal
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Cable Subscription"
        description=" pay for your Favourite TV provider and enjoy your favourite shows"
      />

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {data.map(({ name, img, color, nameColor, bg }) => (
          <Card
            key={name}
            className="px-3 pl-7 py-2.5 mb-4 h-[107px] relative cursor-pointer rounded-[6px]"
            onClick={() => setSelected(name)}
          >
            {/* Selectable Checkbox */}
            <div className="absolute top-2 right-4 w-4 h-4 border-2 border-[#D9D9D9] rounded-full flex items-center justify-center">
              <div
                className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: selected === name ? "#00005D" : "#D9D9D9",
                }}
              ></div>
            </div>

            {/* Content */}
            <div className="flex items-center gap-5 mt-4">
              <div
                className="flex justify-center items-center w-16 h-16 rounded-full overflow-hidden"
                style={{ backgroundColor: bg }}
              >
                <img src={img} alt={name} className="w-full h-full" />
              </div>
              <div>
                <h5 className="text-xl font-bold" style={{ color: nameColor }}>
                  {name}
                </h5>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Error Message */}
      {errorMessage && (
        <div className=" text-red-700 px-4 py-2 ">{errorMessage}</div>
      )}
      <div className="flex flex-col w-full max-w-md">
        <label className="text-sm font-medium text-[#00005D] mt-5 mb-3">
          SmartCard number
        </label>
        <div className="flex items-center gap-2 relative">
          {/* Input Field */}
          <div className="bg-[#F5F5FA] border border-[#A3A3C2] rounded-lg overflow-hidden w-full">
            <input
              type="text"
              value={smartcard}
              onChange={(e) => setSmartcard(e.target.value)}
              placeholder="Enter your SmartCard Number"
              className="w-full px-4 py-2 bg-[#FFFFFF] outline-none text-[#00005D] placeholder:text-[#A3A3C2]"
            />
          </div>

          {/* Button and Dropdown Wrapper */}
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={handleDropdownToggle}
              className="bg-[#00005D] text-[12px] rounded-[6px] text-white px-4 py-3 flex items-center gap-1 font-medium"
            >
              Beneficiaries
              <ChevronDown size={16} />
            </button>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 shadow-md rounded-lg z-10">
                {beneficiaries.length > 0 ? (
                  beneficiaries.map((beneficiary, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#00005D]"
                      onClick={() => {
                        setSmartcard(beneficiary.split(" - ")[1]); // Extracts meter number
                        setIsDropdownOpen(false);
                      }}
                    >
                      {beneficiary}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">Loading...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ">
        <p className="font-bold mt-3"> Offers</p>
        {/* Cards */}
        <BundleTabs setSelectedBundle={setSelectedBundle} />

        {/* Payment Modal */}
        {selectedBundle && (
          <DialogModal
            open={!!selectedBundle}
            setOpen={() => setSelectedBundle(null)}
            title={selectedBundle.Amount}
            showFooter={false}
            // footerButtonText="Pay"
            onSave={() =>
              alert(`Processing payment for ${selectedBundle.bundle}...`)
            }
          >
            {/* Payment Details */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
              <p className="flex justify-between">
                <span>Product Name</span> <span>📺 GOtv</span>
              </p>
              <p className="flex justify-between mt-0.5">
                <span>Account Number</span>{" "}
                <span className="font-semibold">{smartcard}</span>
              </p>
              <p className="flex justify-between mt-0.5">
                <span>Account Name</span>{" "}
                <span className="font-semibold">ENEJE SHALOM</span>
              </p>
              <p className="flex justify-between text-[#00005D] mt-0.5">
                <span>Cashback (₦303.17)</span> <span>-₦303.17</span>
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-1">
              <p className="text-gray-900 font-medium mb-1">Payment Method</p>
              <div className="bg-[#E5E5F5] flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="" size={18} />
                  <p className=" font-medium">Wallet (₦9,973.00)</p>
                </div>
                <CheckCircle className="" size={18} />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <button
                onClick={handlePayment}
                className={`w-full bg-[#00005D] text-white py-2 rounded-md hover:bg-blue-900 transition ${
                  isPaying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Complete Payment"}
              </button>
            </div>
          </DialogModal>
        )}

        {paymentSuccess && (
          <DialogModal
            open={paymentSuccess}
            setOpen={() => setPaymentSuccess(false)}
            title="Payment Successful!"
            showFooter={false}
          >
            <div className="text-center">
              <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Your payment was successful.
              </p>
              <p className="text-sm text-gray-600">
                Thank you for subscribing to {selectedServiceDetails?.name}!
              </p>
              <button
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={() => setPaymentSuccess(false)}
              >
                Close
              </button>
            </div>
          </DialogModal>
        )}
      </main>
    </div>
  );
}
