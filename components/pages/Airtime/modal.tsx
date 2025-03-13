"use client";
import React, { useState } from "react";

export default function AirtimePurchase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Airtime</h1>
      <p className="text-[16px] font-medium text-[#333385]">
        Purchase Airtime at an affordable rate
      </p>

      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#00005D] text-white px-4 py-2 rounded-md mt-4"
      >
        Buy Airtime
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-center text-xl font-bold">Airtel Purchase</h2>
            <p className="text-center text-2xl font-bold text-[#00005D]">₦500</p>

            <div className="mt-4">
              <p className="text-sm font-medium">Product: <span className="font-bold">Airtel</span></p>
              <p className="text-sm font-medium">Cashback: <span className="font-bold">₦50</span></p>
              <p className="text-sm font-medium">Wallet Balance: <span className="font-bold">₦650</span></p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel Payment
              </button>
              <button
                className="bg-[#00005D] text-white px-4 py-2 rounded-md"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
