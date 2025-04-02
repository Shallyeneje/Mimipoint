import PageHeader from "@/components/shared/pageheader";
import React from "react";
import { FaHome } from "react-icons/fa";

const EasybuyContainer = () => {
  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Easybuy"
        description="discover and purchase from vendors World wide"
      />
    </div>
  );
};

export default EasybuyContainer;
