"use client";

import { usePathname } from "next/navigation";
import { Home, Phone, Wifi, Tv, DollarSign, List, Shield, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useLogout } from "../pages/logout/logoutContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  
  const pathname = usePathname(); // Get current path
  const { triggerLogout } = useLogout();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Buy Airtime", icon: Phone, path: "/buyAirtime" },
    { name: "Buy Data", icon: Wifi, path: "/buyData" },
    { name: "Cable & TV", icon: Tv, path: "/cableTv" },
    { name: "Electricity", icon: Tv, path: "/electricity" },
    { name: "Foreign Exchange", icon: DollarSign, path: "/exchange" },
    { name: "EasyBuy", icon: DollarSign, path: "/easybuy" },
    { name: "Transactions", icon: List, path: "/transactions" },
    { name: "Complaints", icon: Shield, path: "/complaints" },
    { name: "Account Info", icon: User, path: "/account-info" },
    // { name: "Login", icon: LogOut, path: "/Login" }
  ];

  return (
    <aside
      className={`left-0 top-[50px] w-64 bg-white p-4 transition-transform duration-300 border-r-[#8A8AB9] ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
      }`}
    >
      <ul className="space-y-2 text-[14px] font-bold">
        {menuItems.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <li key={name}>
              <Link
                href={path}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-[#00005D] text-white" : "hover:bg-[#B3B3E6] text-[#8A8AB9]"
                }`}
              >
                <Icon size={18} />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 🚀 Logout Button */}
      <button
        className=" flex items-center gap-3 font-bold p-3 rounded-lg hover:bg-[#B3B3E6] text-[#8A8AB9] w-full"
        onClick={triggerLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
