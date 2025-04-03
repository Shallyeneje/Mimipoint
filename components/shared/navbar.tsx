"use client";
import { useState } from "react";
import { Menu, Search, Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface NavbarProps {
  activeRoute: string;
  toggleSidebar: () => void; // ✅ Ensure this is included
}

const Navbar = ({ activeRoute, toggleSidebar }: NavbarProps) => {
  const { user } = useUser();
  return (
    <nav className="fixed z-10 bg-white px-5 py-2.5 flex items-center justify-between w-full  border-b-[#8A8AB9]">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-[#00005D] mr-10 text-3xl  ">
          Mimi-point
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-blue-900 ml-14 hover:text-blue-700"
        >
          <Menu size={24} />
        </button>
        <button className="text-[#00005D]  mx-3 hover:text-blue-700">
          <Search size={22} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <div className="relative">
          <Bell size={22} className="text-[#333385]" />
          <span className="absolute -top-2 -right-2 bg-[#B50000] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            23
          </span>
        </div>

        {/* Message Icon */}
        <div className="relative">
          <MessageSquare size={22} className="text-[#333385]" />
          <span className="absolute -top-2 -right-2 bg-[#32A3D9] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            45
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/profile image.png"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
            width={32}
            height={32}
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold ">
              {user?.firstName ? user?.firstName : "Not available"}{" "}
              {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
