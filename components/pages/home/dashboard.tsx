"use client";
import Link from "next/link";
// import DashboardCard from "./dashboardCard";
import RecentActions from "./rectactions";
// import { Wallet, List, Megaphone } from "lucide-react";
import { MegaphoneIcon, ArrowUpDown, PhoneCallIcon } from "lucide-react";
import {
  FiWifi,
  FiTv,
  FiCreditCard,
  FiDollarSign,
  FiList,
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/pageheader";
import { FaHome } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import Transactions from "@/components/shared/transactions";
import { useGetComplaints } from "@/api/data/complaints";
import { useGetTransactions, useGetWallets } from "@/api/data/transactions";
import { WalletResponse } from "@/types/transaction";

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
    name: "Electricity bill",
    icon: FiList,
    color: "#E88B2E",
    bg: "#FFF5E6",
    link: "/electricity",
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const { data: userComplaints } = useGetComplaints();
  const { data: userTransactions } = useGetTransactions();
  const { data: userWallets } = useGetWallets() as {
    data: WalletResponse[];
  };


  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-4">
      <div className="flex justify-between items-center">
        <PageHeader
          icon={<FaHome size={20} />}
          title="Dashboard"
          subtitle="Dashboard"
          description={
            user?.firstName
              ? `Welcome, 
            ${user?.firstName} ${user?.lastName}
            `
              : ""
          }
        />
        <Button
          className="w-[210px] bg-[#00005D] text-[14px] text-white mt-10"
          asChild
        >
          <Link href={"/fundWallet"}>Fund Wallet</Link>
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
        {/* Main Content: 70% (7/10) */}
        <div className="col-span-7 pt-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wallet */}
            {userWallets?.length > 0 ? (
              userWallets?.map((wallet) => (
                <Card
                  className="px-3 py-2.5 h-[140px] border-0"
                  key={wallet.id}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                      <span>Current Balance</span>
                      <span>
                        {wallet.wallet_type === "naira"
                          ? "₦"
                          : wallet.wallet_type === "usd"
                          ? "$"
                          : "₦"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="gap-0">
                    <h6 className="text-[40px] font-bold text-[#00005D]">
                      {wallet?.balance}
                    </h6>
                    <p className="text-sm text-[#8A8AB9]">Amount in Wallet</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="px-3 py-2.5 h-[140px] border-0">
                <CardHeader className="gap-0">
                  <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                    <span>Current Balance</span>
                    <span>₦</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="gap-0">
                  <h6 className="text-[40px] font-bold text-[#00005D]">0</h6>
                  <p className="text-sm text-[#8A8AB9]">Amount in Wallet</p>
                </CardContent>
              </Card>
            )}

            {/* Transactions */}
            <Card className="px-3 py-2.5 h-[140px]">
              <CardHeader className="gap-0">
                <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                  <span>Transactions</span>
                  <ArrowUpDown size={18} className="text-[#00005D]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h6 className="text-[40px] font-bold text-[#00005D]">
                  {userTransactions?.length || 0}
                </h6>
                <p className="text-sm text-[#8A8AB9]">Completed transactions</p>
              </CardContent>
            </Card>

            {/* Complaints */}
            <Card className="px-3 py-2.5 h-[140px]">
              <CardHeader className="gap-0">
                <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                  <span>Complaints</span>
                  <MegaphoneIcon size={22} className="text-[#00005D]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h6 className="text-[40px] font-bold text-[#00005D]">
                  {userComplaints?.length || 0}
                </h6>
                <p className="text-sm text-[#8A8AB9]">Registered Complaints</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {services.map(({ name, icon: Icon, color, bg, link }) => (
              <Link key={name} href={link}>
                <Card className="p-2 h-[100px] flex items-center justify-center cursor-pointer border-0">
                  <div className="flex items-center">
                    {/* Icon */}
                    <div
                      className="flex justify-center items-center w-10 h-10 rounded-full"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>

                    {/* Text */}
                    <CardContent className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl">{name}</h3>
                      <p className="text-[10px] text-[#8A8AB9] mt-1">
                        Get instant airtime for all networks
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar: 30% (3/10) */}
        <div className="col-span-3">
          <RecentActions />
        </div>
      </div>

      {/* Transaction */}
      <div className="mt-8">
        <Transactions />
      </div>
    </div>
  );
}
