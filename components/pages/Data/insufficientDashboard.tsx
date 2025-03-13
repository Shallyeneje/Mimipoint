"use client";
import React, { useState } from "react";
import { PhoneCallIcon } from "lucide-react";
import { FiWifi, FiHome, FiTv, FiCreditCard } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import InsufficientDataBal from "./insufficientBal";
import DataTransactions from "./dataTransactions";
import Link from "next/link";
const data = [
  {
    name: "MTN",
    description: "everywhere you go",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    nameColor: "#FFCC00", // MTN Yellow
    bg: "#E6F7FF",
    href: "#",
  },
  {
    name: "Airtel",
    description: "smartphone network",
    icon: FiWifi,
    color: "#009900",
    nameColor: "#E60000", // Airtel Red
    bg: "#E6FFE6",
    href: "/airtel",
  },
  {
    name: "9mobile",
    description: "here for you",
    icon: FiTv,
    color: "#E88B2E",
    nameColor: "#008000", // 9mobile Green
    bg: "#FFF5E6",
    href: "/9mobile",
  },
  {
    name: "Glo",
    description: "rule your world",
    icon: FiCreditCard,
    color: "#2E94C5",
    nameColor: "#009900", // Glo Green
    bg: "#E6F7FF",
    href: "/daily",
  },
];

export default function InsufficientDataDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [clicked, setClicked] = useState("daily");

  const options = [
    { label: "daily", href: "/daily" },
    { label: "2 weeks", href: "/2-weeks" },
    { label: "monthly", href: "/monthly" },
  ];

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <div className="w-64  hidden md:block">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <FiHome size={20} /> Dashboard
              </h2>
            </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Data Purchase</h1>
      <p className="text-[16px] font-medium text-[#333385]">
        Data Airtime at an affordable rate
      </p>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map(({ name, description, icon: Icon, color, nameColor, bg,href }) => (
          <Link key={name} href={href} legacyBehavior>
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
          </Link>
        ))}
      </div>
      <h3 className="text-[#00005D] font-bold text-xl mt-4">Top MTN Data Offers</h3>
      <div className="flex bg-[#C2C2E0] rounded-[6px] p-1 w-max mt-4">
      {options.map(({ label, href }) => (
        <Link key={label} href={href} legacyBehavior>
          <a
            onClick={() => setClicked(label)}
            className={`px-4 py-1 text-sm font-medium rounded-[6px] transition-colors ${
              clicked === label ? "bg-[#00005D] text-white" : "text-black"
            }`}
          >
            {label}
          </a>
        </Link>
      ))}
    </div>
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 ">
          {/* Service Buttons */}
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { bundle: "200MB", pay: "₦150/1day" },
              { bundle: "500MB", pay: "₦150/1day" },
              { bundle: "750MB", pay: "₦150/1day" },
              { bundle: "1GB", pay: "₦150/1day" },
              { bundle: "2GB", pay: "₦150/1day" },
              { bundle: "3GB", pay: "₦150/1day" },
              { bundle: "5GB", pay: "₦150/1day" },
              { bundle: "7GB", pay: "₦150/1day" },
              { bundle: "10GB", pay: "₦150/1day" },
            ].map(({ bundle, pay }, index) => (
              <Card
                key={`${bundle}-${index}`}
                className=" h-[100px] flex items-center p-4 rounded-[6px]"
              >
                <CardContent className="flex flex-col justify-center">
                  <h3 className="font-bold text-[#00005D] text-2xl">{bundle}</h3>
                  <p className="text-[14px] text-[#8A8AB9]">{pay}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        {/* Sidebar: Purchase Airtime */}
        <aside className="w-64 "><InsufficientDataBal/></aside>
      </div>
      <div className="mt-10">
      <DataTransactions/>
      </div>
    </div>
  );
}
