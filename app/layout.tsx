"use client";

import { useState } from "react";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import "./globals.css";
import { LogoutProvider } from "@/components/pages/logout/logoutContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mimi-point</title>
      </head>
      <LogoutProvider>
        <body className="bg-[#f9f9f9] flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar
            activeRoute="/"
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Page Layout */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 ">{children}</main>
          </div>
        </body>
      </LogoutProvider>
    </html>
  );
}
