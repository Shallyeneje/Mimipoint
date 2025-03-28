"use client";
import React from "react";
import QueryProvider from "./react-query";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryProvider>
      <Toaster />
      <UserProvider>{children}</UserProvider>
    </QueryProvider>
  );
};

export default Providers;
