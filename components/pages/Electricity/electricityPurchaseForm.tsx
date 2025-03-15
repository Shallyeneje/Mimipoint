"use client";
import { useState } from "react";

export default function ElectricityPurchaseForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className=" mx-4 mt-2  w-full max-w-md   p-4">
      <label className="block text-[14px] font-medium text-[#00005D] mb-1">Amount</label>
      <select
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
>
  <option value="" disabled defaultValue="1">Other data offers</option>
  <option value="50">₦50</option>
  <option value="100">₦100</option>
  <option value="200">₦200</option>
  <option value="500">₦500</option>
  <option value="1000">₦1000</option>
  <option value="2000">₦2000</option>
</select>


      <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">Phone number</label>
      <input
        type="tel"
        placeholder="08080982606"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
        />

      <button className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900">
        Purchase Data
      </button>
    </div>
  );
}
