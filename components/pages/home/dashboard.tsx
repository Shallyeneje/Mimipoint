"use client";
import Link from "next/link";
// import DashboardCard from "./dashboardCard";
import RecentActions from "./rectactions";
// import { Wallet, List, Megaphone } from "lucide-react";


import { useEffect, useState } from "react";

import {
  MegaphoneIcon,
  ArrowUpDown,
  PhoneCallIcon,
} from "lucide-react";
import {
  FiHome,
  FiPhoneCall,
  FiWifi,
  FiTv,
  FiCreditCard,
  FiDollarSign,
  FiList,
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const services = [
  {
    name: "Buy Airtime",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    bg: "#E6F7FF",
    link: "/buyAirtime",
  },
  {
    name: "Buy Data",
    icon: FiWifi,
    color: "#009900",
    bg: "#E6FFE6",
    link: "/buyData",
  },
  { 
    name: "Cable TV", 
    icon: FiTv, 
    color: "#E88B2E", 
    bg: "#FFF5E6", 
    link: "/cableTv",
  },
  {
    name: "EasyBuy",
    icon: FiCreditCard,
    color: "#2E94C5",
    bg: "#E6F7FF",
    link: "/easybuy",
  },
  {
    name: "Exchange",
    icon: FiDollarSign,
    color: "#009900",
    bg: "#E6FFE6",
    link: "/exchange",
  },
  {
    name: "Pay Bills",
    icon: FiList,
    color: "#E88B2E",
    bg: "#FFF5E6",
    link: "/electricity",
  },
];
interface DashboardData {
  balance: number;
  transactions: number;
  complaints: number;
  actions: { text: string; type: string }[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard"); 
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#EFEFF5] ">
      <div className="w-64 p-6 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FiHome size={20} /> Dashboard
        </h2>
      </div>

      <div className="  m-6">
        <h1 className="text-4xl font-bold text-[#00005D]">Dashboard</h1>
        <div className="flex   justify-between">
          <div>
            <p className="text-[16px] ">Welcome, Gozzy</p>
          </div>
          <Link href={"/fundWallet"}>
          <Button className="w-[210px] bg-[#00005D] text-[14px] text-white">
            Fund Wallet
          </Button>
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Section */}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <Card className="px-3 py-2.5 h-[140px]">
                <CardHeader className="gap-0">
                  <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                    <span>Current Balance</span>
                    <span className="">₦</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="gap-0">
                  <p className="text-[40px] font-bold text-[#00005D]">
                    {/* ${data?.balance} */}
                    $765
                  </p>
                  <p className="text-sm text-[#8A8AB9]">Amount in Wallet</p>
                </CardContent>
              </Card>

              <Card className="px-3 py-2.5 h-[140px]">
                <CardHeader className="gap-0">
                  <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                    <span>Transactions</span>
                    <span className=""><ArrowUpDown size={18} className="text-[#00005D]" /> </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[40px] font-bold text-[#00005D]">
                    {/* {data?.transactions} */}34
                  </p>
                  <p className="text-sm text-[#8A8AB9]">
                    Completed transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="px-3 py-2.5 h-[140px]">
                <CardHeader className="gap-0">
                  <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                    <span>Complaints</span>
                    <span className=""><MegaphoneIcon size={22} className="text-[#00005D]" /> </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-[40px] font-bold text-[#00005D]">
                    {/* {data?.complaints} */}24
                  </p>
                  <p className="text-sm text-[#8A8AB9]">
                    Registered Complaints
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Service Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
      {services.map(({ name, icon: Icon, color, bg, link }) => (
        <Link key={name} href={link}>
          <Card className="p-2 h-[100px] flex items-center cursor-pointer">
            <div className="grid grid-cols-[40px_auto] items-center w-full">
              {/* Icon Column with Circular Background */}
              <div className="flex justify-center items-center w-10 h-10 rounded-full" style={{ backgroundColor: bg }}>
                <Icon size={24} style={{ color }} />
              </div>

              {/* Text Column */}
              <CardContent className="flex flex-col justify-center">
                <h3 className="font-bold text-xl">{name}</h3>
                <p className="text-[10px] text-[#8A8AB9]">
                  Get instant airtime for all networks
                </p>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
            </main>

        {/* Sidebar: Recent Actions */}
        <aside className="w-64 ">
         
          <RecentActions />

        </aside>
      </div>
    </div>
  );
}
