"use client";
import React, { useState } from "react";
import { PhoneCallIcon } from "lucide-react";
import { FiWifi, FiHome, FiTv, FiCreditCard } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import DataCards from "./DataCards";

const data = [
  {
    name: "MTN",
    description: "everywhere you go",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    nameColor: "#FFCC00",
    bg: "#E6F7FF",
    href: "#",
  },
  {
    name: "Airtel",
    description: "smartphone network",
    icon: FiWifi,
    color: "#009900",
    nameColor: "#E60000",
    bg: "#E6FFE6",
    href: "/airtel",
  },
  {
    name: "9mobile",
    description: "here for you",
    icon: FiTv,
    color: "#E88B2E",
    nameColor: "#008000",
    bg: "#FFF5E6",
    href: "/9mobile",
  },
  {
    name: "Glo",
    description: "rule your world",
    icon: FiCreditCard,
    color: "#2E94C5",
    nameColor: "#009900",
    bg: "#E6F7FF",
    href: "/daily",
  },
];

export default function DataDashboard() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-8">
      <div className="w-64 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FiHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Data Purchase</h1>
      <p className="text-[16px] font-medium text-[#333385]">
        Data Airtime at an affordable rate
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {data.map(({ name, description, icon: Icon, color, nameColor, bg, href }) => (
          <Link key={name} href={href} legacyBehavior>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="network"
                value={name}
                checked={selected === name}
                onChange={() => setSelected(name)}
                className="hidden"
              />
              <Card
                className={`px-2 py-2 h-[80px] sm:h-[100px] flex items-center rounded-[6px] 
                xs:scale-75 sm:scale-90 md:scale-100 transition-all duration-200 ${
                  selected === name ? "border-2 border-[#00005D]" : ""
                }`}
              >
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
            </label>
          </Link>
        ))}
      </div>

      <h3 className="text-[#00005D] font-bold text-xl mt-8">
        Top MTN Data Offers
      </h3>
      <DataCards />
    </div>
  );
}
