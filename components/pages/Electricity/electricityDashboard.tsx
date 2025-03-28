"use client";
import React, { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ElectricityPurchaseForm from "./electricityPurchaseForm";
import { FaHome } from "react-icons/fa";
import { ElectricityProvider, electricityProviders } from "@/api/static-data";
import PageHeader from "@/components/shared/pageheader";

export default function ElectricityDashboard() {
  const paymentOptions = [
    { name: "Prepaid", href: "#" },
    { name: "Postpaid", href: "#" },
  ];
  const electricity = electricityProviders;
  const [selected, setSelected] = useState<string | null>(
    paymentOptions[0].name
  );
  const [selectedProvider, setSelectedProvider] =
    useState<ElectricityProvider | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Electricity Bills"
        description="Pay your Electricity bills to your current provider, with ease"
       />

      <div className="grid grid-cols-2 gap-2 mt-6 w-[260px]">
        {paymentOptions.map(({ name, href }) => (
          <Link key={name} href={href} legacyBehavior>
            <div
              className={`px-4 py-2 h-[40px] flex items-center justify-center cursor-pointer rounded-[6px] border transition-all duration-200 ${
                selected === name
                  ? "bg-[#E6FFE6] border-[#009900] text-[#009900]" // Light green active
                  : "bg-[#FFFFFF] border-[#D9D9D9] text-[#00005D]" // Default gray
              }`}
              onClick={() => setSelected(name)}
            >
              {name}
              {selected === name && (
                <CheckCircle size={12} className="ml-2 text-[#009900]" />
              )}
            </div>
          </Link>
        ))}
      </div>

      <h3 className="text-[#00005D] font-bold text-xl mt-4">Top Up Now</h3>
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 ">
          {/* Service Buttons */}

          <div className="grid grid-cols-3 gap-4 mt-6">
            {electricity.map(({ id, img, name }, index) => (
              <Card
                key={id}
                className="relative h-[100px] flex items-center p-4 rounded-[6px] cursor-pointer"
                onClick={() => {
                  setSelectedProvider({ id, img, name });
                  setIsOpen(true);
                }}
              >
                {/* Selectable Checkbox */}
                <div className="absolute top-2 right-4 w-4 h-4 border-2 border-[#D9D9D9] rounded-full flex items-center justify-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor:
                        selectedProvider?.name === name ? "#00005D" : "#D9D9D9",
                    }}
                  ></div>
                </div>

                <CardContent className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-lg overflow-hidden shrink-0"
                    style={{ backgroundColor: "#F5F5FA" }}
                  >
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[#00005D]">
                      {name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        {/* Sidebar: Purchase Airtime */}
        <aside className="w-64 ">
          <ElectricityPurchaseForm provider={selectedProvider} />
        </aside>
      </div>
    </div>
  );
}
