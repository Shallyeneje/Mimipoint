"use client";
import React from "react";
import QueryProvider from "./react-query";
import { UserProvider } from "./context/UserContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryProvider>
      <UserProvider>{children}</UserProvider>
    </QueryProvider>
  );
};

export default Providers;
