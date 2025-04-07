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
import { useGetUserProducts } from "@/api/data/easybuy";
import { ProductResponse } from "@/types/easybuy";

const services = [
  {
    name: "Buy Airtime",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    bg: "#E6F7FF",
    link: "/buyAirtime",
    desc: "Get instant airtime for all networks",
  },
  {
    name: "Buy Data",
    icon: FiWifi,
    color: "#009900",
    bg: "#E6FFE6",
    link: "/buyData",
    desc: "Get instant data for all networks",
  },
  {
    name: "Cable TV",
    icon: FiTv,
    color: "#E88B2E",
    bg: "#FFF5E6",
    link: "/cableTv",
    desc: "Get instant cable TV subscription",
  },
  {
    name: "EasyBuy",
    icon: FiCreditCard,
    color: "#2E94C5",
    bg: "#E6F7FF",
    link: "/easybuy",
    desc: "Easily showcase your products and services",
  },
  {
    name: "Exchange",
    icon: FiDollarSign,
    color: "#009900",
    bg: "#E6FFE6",
    link: "/exchange",
    desc: "convert your currency easily, quickly and securely",
  },
  {
    name: "Electricity bill",
    icon: FiList,
    color: "#E88B2E",
    bg: "#FFF5E6",
    link: "/electricity",
    desc: "Get instant electricity bill payment",
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const { data: userComplaints } = useGetComplaints();
  const { data: userTransactions } = useGetTransactions();
  const { data: userWallets } = useGetWallets() as {
    data: WalletResponse[];
  };
  const { data: easyBuyProducts, isLoading: loadingUserProducts } =
    useGetUserProducts() as {
      data: ProductResponse[];
      isLoading: boolean;
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
                  className="px-3 py-2.5 pt-5 h-[140px] border-0"
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
                    <h6 className="text-[35px] font-bold text-[#00005D]">
                      {wallet?.balance}
                    </h6>
                    <p className="text-sm text-[#8A8AB9]">Amount in Wallet</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="px-3 py-2.5 pt-5 h-[140px] border-0">
                <CardHeader className="gap-0">
                  <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                    <span>Current Balance</span>
                    <span>₦</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="gap-0">
                  <h6 className="text-[35px] font-bold text-[#00005D]">0</h6>
                  <p className="text-sm text-[#8A8AB9]">Amount in Wallet</p>
                </CardContent>
              </Card>
            )}

            {/* Transactions */}
            <Card className="px-3 py-2.5 pt-5 h-[140px]">
              <CardHeader className="gap-0">
                <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                  <span>Transactions</span>
                  <ArrowUpDown size={18} className="text-[#00005D]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h6 className="text-[35px] font-bold text-[#00005D]">
                  {userTransactions?.length || 0}
                </h6>
                <p className="text-sm text-[#8A8AB9]">Completed transactions</p>
              </CardContent>
            </Card>

            {/* Complaints */}
            <Card className="px-3 py-2.5 pt-5 h-[140px]">
              <CardHeader className="gap-0">
                <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                  <span>Complaints</span>
                  <MegaphoneIcon size={22} className="text-[#00005D]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h6 className="text-[35px] font-bold text-[#00005D]">
                  {userComplaints?.length || 0}
                </h6>
                <p className="text-sm text-[#8A8AB9]">Registered Complaints</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {services.map(({ name, icon: Icon, color, bg, link, desc }) => (
              <Link key={name} href={link}>
                <Card className="p-2 h-[100px] flex px-4 justify-center cursor-pointer border-0 ">
                  <div className="flex items-center gap-2">
                    {/* Icon */}
                    <div
                      className="flex justify-center items-center w-10 h-10 rounded-full shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl">{name}</h3>
                      <p className="text-[10px] text-[#8A8AB9] mt-1">{desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Products Section */}
          {/* <div className="mt-8">
            <div className="flex  gap-3 text-[#00005D] mb-2.5 ">
              <span className="">
              </span>
              <h6 className="text-2xl font-bold text-[#00005D] flex items-center gap-2 ">
                Products
              </h6>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {easyBuyProducts?.length > 0 ? (
                easyBuyProducts?.map((product) => (
                  <Card
                    key={product.id}
                    className="p-4 bg-white shadow-md rounded-lg"
                  >
                    <CardHeader className="gap-0">
                      <CardTitle className="text-[18px] font-medium text-[#00005D] flex justify-between w-full">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="gap-0">
                      <p className="text-sm text-[#8A8AB9]">{product.price}</p>
                      <p className="text-sm text-[#8A8AB9] mt-2">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : loadingUserProducts ? (
                <div className="flex gap-2 items-center justify-center">
                  <CgSpinner className="animate-spin" size={20} />
                  <p className="text-center text-gray-500">
                    Loading products...
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <p className="text-center text-gray-500">No products found</p>
                </div>
              )}
            </div>
          </div> */}

          {/* Transaction table */}
          <div className="mt-8">
            <Transactions />
          </div>
        </div>

        {/* Sidebar: 30% (3/10) */}
        <div className="col-span-3">
          <RecentActions />
        </div>
      </div>
    </div>
  );
}
