"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PurchaseAirtime from "./airtimePurchaseForm";
import { Button } from "@/components/ui/button";
import { DialogModal } from "@/components/shared/dialogModal";
import Image from "next/image";
import PageHeader from "@/components/shared/pageheader";
import { FaHome } from "react-icons/fa";
import { BiWalletAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import Transactions from "@/components/shared/transactions";

const data = [
  {
    name: "mtn",
    description: "everywhere you go",
    img: "/images/mtn logo.jpg",
    color: "#FFC415",
    nameColor: "#FFC415",
    bg: "#FFF9E2",
  },
  {
    name: "airtel",
    description: "smartphone network",
    img: "/images/airtel logo.png",
    color: "#B50000",
    nameColor: "#B50000",
    bg: "#FFE6E6",
  },
  {
    name: "9mobile",
    description: "here for you",
    img: "/images/9mobile logo.png",
    color: "#005900",
    nameColor: "#005900",
    bg: "#E6FFE6",
  },
  {
    name: "glo",
    description: "rule your world",
    img: "/images/glo logo.jpg",
    color: "#007300",
    nameColor: "#007300",
    bg: "#E6FFE6",
  },
];

export default function AirtimeDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const wallet = 6500;

  // Handle Payment
  const handlePayment = () => {
    if (!phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }
    setIsModalOpen(false);
    setConfirmationModal(true);
  };

  // Reset the Form inputs
  const handleReset = () => {
    setSelected(null);
    setAmount("");
    setPhoneNumber("");
  };

  const handleAirtimePurchase = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setConfirmationModal(false);
      toast.success("Airtime Purchase was Successful");
      handleReset();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Airtime Purchase"
        description="Purchase Airtime at an affordable rate"
      />

      {/* Network Provider Selection (as Radio Buttons) */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {data.map(({ name, description, img, color, nameColor, bg }) => (
          <Card
            key={name}
            onClick={() => setSelected(name)}
            className={`cursor-pointer px-2 py-2 h-[80px] sm:h-[100px] flex items-center rounded-[6px] 
                          xs:scale-75 sm:scale-90 md:scale-100 transition-all duration-200 border-2`}
            style={{
              borderColor: selected === name ? color : "transparent",
            }}
          >
            {/* Selectable Checkbox */}
            <div
              className="absolute top-2 right-4 w-4 h-4 border-2 rounded-full flex items-center justify-center"
              style={{
                borderColor: selected === name ? color : "#D9D9D9",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: selected === name ? color : "#D9D9D9",
                }}
              ></div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <div
                className="w-[44px] h-[44px] rounded-full overflow-hidden"
                style={{ backgroundColor: bg }}
              >
                <Image
                  src={img}
                  alt={name}
                  width={44}
                  height={44}
                  className="w-full h-full"
                />
              </div>
              <div>
                <p
                  className="text-[18px] font-bold"
                  style={{ color: nameColor }}
                >
                  {name}
                </p>
                <p className="text-sm text-[#8A8AB9]">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h3 className="text-[#00005D] font-bold text-xl mt-8">Top up now</h3>
      <div className="md:flex">
        <main className="flex-1">
          {/* Airtime Selection Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {["50", "100", "200", "500", "1000", "2000"].map((price, index) => (
              <Card
                key={index}
                className="h-[100px] flex items-center p-4 rounded-[6px] cursor-pointer"
                onClick={() => {
                  if (!selected) {
                    return toast.error("select a network provider first");
                  }
                  setAmount(price);
                  setIsModalOpen(true);
                }}
              >
                <CardContent className="flex flex-col justify-center">
                  <h3 className="font-bold text-[#00005D] text-[30px] md:text-[24px] sm:text-[18px]">
                    ₦{price}
                  </h3>

                  <p className="text-[14px] text-[#8A8AB9]">Pay ₦{price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Modal */}
          <DialogModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="Complete Payment"
            showFooter={false}
          >
            <div className="flex flex-col">
              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

              {/* Amount Input (Auto-filled, Editable) */}
              <label className="block text-[14px] font-medium text-[#00005D] mb-1">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900 ${
                  error ? "border-red-500" : ""
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {/* Phone Number Input */}
              <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">
                Phone number
              </label>
              <input
                type="number"
                placeholder="Enter Phone Number"
                className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-[#00005D] ${
                  error ? "border-red-500" : ""
                }`}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError(null);
                }}
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                className="bg-[#00005D] text-white"
                onClick={handlePayment}
              >
                Purchase Airtime
              </Button>
            </div>
          </DialogModal>

          {/* Confirmation Modal */}
          <DialogModal
            open={confirmationModal}
            setOpen={() => {
              handleReset();
              setConfirmationModal(!confirmationModal);
            }}
            title=""
            showFooter={false}
          >
            <div>
              <h3 className="text-indigo-950 text-base text-center font-medium leading-7">
                Payment Summary
              </h3>
              <h2 className="text-center text-indigo-950 text-3xl leading-10">
                ₦{amount}
              </h2>
            </div>

            <div className="flex justify-between items-start px-3">
              <p className="text-indigo-950 text-base font-medium leading-7">
                Product :
              </p>
              <p className="text-indigo-950 text-sm font-medium leading-snug">
                {selected}
              </p>
            </div>

            <div className="px-3">
              <p className="text-sm font-medium">
                Cashback: <span className="font-bold text-primary">₦50</span>
              </p>
            </div>

            <div className="flex justify-between px-5 py-2 bg-gray-100 rounded-[10px]">
              <div className="flex justify-start items-center gap-2.5 text-[#8A8AB9]">
                <BiWalletAlt size={20} />
                <div className="text-sm font-medium">wallet</div>
              </div>
              <div className="text-indigo-950 text-sm font-bold">
                : ₦{wallet}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                className="bg-[#00005D] text-white w-full"
                onClick={() => handleAirtimePurchase()}
                disabled={processingPayment}
              >
                {processingPayment ? (
                  <span className="flex items-center justify-center gap-2">
                    <CgSpinner className="animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Complete Payment"
                )}
              </Button>
              <button
                className="w-full bg-[#E30B17] text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
                onClick={() => setConfirmationModal(false)}
              >
                Cancel Payment
              </button>
            </div>
          </DialogModal>
        </main>

        {/* Sidebar: Purchase Airtime */}
        <aside className="w-64 ">
          <PurchaseAirtime
            wallet={wallet}
            selectedProduct={selected}
            setSelectedProduct={setSelected}
          />
        </aside>
      </div>
      <div className="mt-8">
        <Transactions />
      </div>
    </div>
  );
}
