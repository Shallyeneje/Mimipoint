import PageHeader from "@/components/shared/pageheader";
import Transactions from "@/components/shared/transactions";
import React from "react";
import { FaHome } from "react-icons/fa";

const page = () => {
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3 space-y-5">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Transactions"
        description="recents Transactions carried out by you, Airtime, Data, Bills, Topups etc"
      />
      <Transactions />
    </div>
  );
};

export default page;
