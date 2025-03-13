"use client";
import React, { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ElectricityPurchaseForm from "./electricityPurchaseForm";

export default function ElectricityDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [smartcard, setSmartcard] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  

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
  const data = [
    { name: "MTN", href: "#" },
    { name: "Airtel", href: "/airtel" },
  ];
  const paymentOptions = [
    { name: "Prepaid", href: "#" },
    { name: "Postpaid", href: "#" },
  ];
  const electricityProviders = [
    { name: "Select Provider", logo: "" }, 
    { name: "Ikeja Electricity", logo: "/ikeja-logo.png" },
    { name: "Eko Electricity", logo: "/eko-logo.png" },
    { name: "Abuja Electricity", logo: "/abuja-logo.png" },
  ];
  const [selectedProvider, setSelectedProvider] = useState(electricityProviders[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">
        Electricity Bills
      </h1>
      <p className="text-[16px] font-medium text-[#333385]">
        Pay your Electricity bills to your current provider, with ease
      </p>
      <div className="relative w-64 my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-transparent  "
      >
        <div className="flex items-center gap-2">
          {selectedProvider.logo && (
            <img src={selectedProvider.logo} alt={selectedProvider.name} className="w-8 h-8 rounded-md" />
          )}
          <span className={`text-gray-800 font-medium ${selectedProvider.name === "Select Provider" ? "text-gray-400" : ""}`}>
            {selectedProvider.name}
          </span>
        </div>
        <ChevronDown size={16} className="text-gray-600" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
          {electricityProviders.map((provider, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedProvider(provider);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {provider.logo && <img src={provider.logo} alt={provider.name} className="w-8 h-8 rounded-md" />}
              <span className={`text-gray-800 ${provider.name === "Select Provider" ? "text-gray-400" : ""}`}>
                {provider.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
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
            {selected === name && <CheckCircle size={8} p-2 className="ml-2 text-[#FFFFFF] bg-[#009900]" />}
          </div>
        </Link>
      ))}
    </div>

           


      <div className="flex flex-col w-full max-w-md">
        <label className="text-sm font-medium text-[#00005D] mt-6 mb-3">
          Meter number
        </label>
      <div className="flex items-center gap-2 relative">
        {/* Input Field */}
        <div className=" bg-[#F5F5FA] border border-[#A3A3C2] rounded-lg overflow-hidden">
          <input
            type="text"
            value={smartcard}
            onChange={(e) => setSmartcard(e.target.value)}
            placeholder="enter your Meter Number"
            className="flex-1 px-4 py-2 bg-[#FFFFFF] outline-none text-[#00005D] placeholder:text-[#A3A3C2]"
          />
          
        </div>
        {/* Dropdown Button */}
        <button
          onClick={handleDropdownToggle}
          className="bg-[#00005D] text-[12px] rounded-[6px] text-white px-4 py-3 flex items-center gap-1 font-medium relative"
        >
          Beneficiaries
          <ChevronDown size={16} />
        </button>
        </div>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 shadow-md rounded-lg z-10">
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
      <h3 className="text-[#00005D] font-bold text-xl mt-4">Top Up Now</h3>

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
        <aside className="w-64 "><ElectricityPurchaseForm/></aside>
      </div>
      
    </div>
  );
}
