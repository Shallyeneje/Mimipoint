"use client";
import React, { useState } from "react";
import { PhoneCallIcon, } from "lucide-react";
import { FiWifi, FiHome, FiTv, FiCreditCard } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import PurchaseAirtime from "./airtimePurchaseForm";
import AirtimeTransactions from "./airtimeTransactions";

const data = [
  {
    name: "MTN",
    description: "everywhere you go",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    nameColor: "#FFCC00", // MTN Yellow
    bg: "#E6F7FF",
  },
  {
    name: "Airtel",
    description: "smartphone network",
    icon: FiWifi,
    color: "#009900",
    nameColor: "#E60000", // Airtel Red
    bg: "#E6FFE6",
  },
  {
    name: "9mobile",
    description: "here for you",
    icon: FiTv,
    color: "#E88B2E",
    nameColor: "#008000", // 9mobile Green
    bg: "#FFF5E6",
  },
  {
    name: "Glo",
    description: "rule your world",
    icon: FiCreditCard,
    color: "#2E94C5",
    nameColor: "#009900", // Glo Green
    bg: "#E6F7FF",
  },
];

export default function AirtimeDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <div className="w-64  hidden md:block">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <FiHome size={20} /> Dashboard
              </h2>
            </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Airtime</h1>
      <p className="text-[16px] font-medium text-[#333385]">
        Purchase Airtime at an affordable rate
      </p>
      
      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map(({ name, description, icon: Icon, color, nameColor, bg }) => (
          <Card
            key={name}
            className="px-3 py-2.5 h-[107px] relative flex items-center cursor-pointer rounded-[6px]"
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

            {/* Icon and Text */}
            <div className="flex items-center gap-2 mt-4">
              <div
                className="flex justify-center items-center w-10 h-10 rounded-full"
                style={{ backgroundColor: bg }}
              >
                <Icon size={24} style={{ color }} />
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
      <h3 className="text-[#00005D] font-bold text-xl mt-4">Top up now</h3>
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 ">
          {/* Service Buttons */}
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { price: "₦50", pay: "pay ₦50" },
              { price: "₦100", pay: "pay ₦100" },
              { price: "₦200", pay: "pay ₦200" },
              { price: "₦500", pay: "pay ₦500" },
              { price: "₦1000", pay: "pay ₦1000" },
              { price: "₦2000", pay: "pay ₦2000" },
            ].map(({ price, pay }, index) => (
              <Card
                key={`${price}-${index}`}
                className=" h-[100px] flex items-center p-4 rounded-[6px]"
              >
                <CardContent className="flex flex-col justify-center">
                  <h3 className="font-bold text-[#00005D] text-3xl">{price}</h3>
                  <p className="text-[14px] text-[#8A8AB9]">{pay}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        {/* Sidebar: Purchase Airtime */}
        <aside className="w-64 "><PurchaseAirtime /></aside>
      </div>
      <div className="mt-10">
      <AirtimeTransactions/>
      </div>
    </div>
  );
}
