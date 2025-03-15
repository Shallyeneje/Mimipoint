import React from "react";
import Dashboard from "@/components/pages/home/dashboard";
import Transactions from "@/components/shared/transaction";

const page = () => {
  return (
    <>
      <Dashboard />
      <Transactions />
    </>
  );
};

export default page;
