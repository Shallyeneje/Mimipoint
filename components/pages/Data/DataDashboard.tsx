"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import DataCards from "./DataCards";
import { dataPlans, NetworkDataPlans } from "@/api/static-data";
import Image from "next/image";
import PageHeader from "@/components/shared/pageheader";
import { FaHome } from "react-icons/fa";

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

export default function DataDashboard() {
  const [selected, setSelected] = useState<string | null>("mtn");
  const dataplan: Record<string, NetworkDataPlans> = dataPlans;
  const [filteredData, setFilteredData] = useState<NetworkDataPlans | null>(
    null
  );

  useEffect(() => {
    if (selected) {
      setFilteredData(dataplan[selected]);
    }
  }, [selected]);

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Data Purchase"
        description="Get your Favourite Data bundle at an affordable rate"
      />

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

      <h3 className="text-[#00005D] font-bold text-xl mt-8">
        Top <span className="uppercase">{selected}</span> Data Offers
      </h3>
      <DataCards datatoshow={filteredData} />
    </div>
  );
}
