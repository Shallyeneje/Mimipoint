import PageHeader from "@/components/shared/pageheader";
import React from "react";
import { FaHome } from "react-icons/fa";

const ExchangeContainer = () => {
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Exchange"
        description="Convert your Naira into other currencies round the World"
      />
    </div>
  );
};

export default ExchangeContainer;
