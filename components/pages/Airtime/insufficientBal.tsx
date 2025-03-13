"use client";
import Link from "next/link";
import { useState } from "react";

export default function InsufficientBal() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className=" mx-4 mt-2  w-full max-w-md   p-4">
      <label className="block text-[14px] font-medium text-[#00005D] mb-1">Amount</label>
      <input
        type="number"
        placeholder="50-50000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
      />

      <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">Phone number</label>
      <input
        type="tel"
        placeholder="08080982606"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
        />

    <p className="text-[#FF0000] text-sm mt-3">Your balance is too low for this Airtime puchase, please TopUp</p>
      <Link href={'/fundWallet'}>
      <button className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900">
        Top Up Now
      </button>
      </Link>
    </div>
  );
}

