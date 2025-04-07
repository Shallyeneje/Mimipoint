"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Phone,
  Wifi,
  Tv,
  DollarSign,
  List,
  Shield,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
// import { useLogout } from "../pages/logout/logoutContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Adjust import if necessary
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
// import Logo from "@/public/logo.png"; // Adjust logo path
import LogoutModal from "./logout-modal";
import { useEffect, useState } from "react";
import Image from "next/image";

const SidebarComponent = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // console.log(isSignedIn, user);

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
  ];

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 pt-7">
              <div className="flex items-center space-x-2">
                {/* <Image src={Logo} alt="Logo" className="w-[40px]" /> */}
                <h4 className="text-lg font-bold text-[#101928]">Mimi-point</h4>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Sidebar Menu */}
          <SidebarGroupContent>
            <SidebarMenu className="p-4 pt-3">
              {menuItems.map(({ name, icon: Icon, path }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    asChild
                    className={`h-[42px] px-3 text-sm transition ${
                      pathname === path
                        ? "bg-primary text-white"
                        : "text-[#414189] hover:bg-gray-100"
                    }`}
                  >
                    <Link href={path}>
                      <Icon size={18} className="mr-2" />
                      {name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <Separator className="h-[1.2px] bg-[#F0F2F5] my-4" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer - User Profile & Logout */}
      {hasMounted && (
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="py-4">
                <SidebarMenuItem className="h-[48px] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    {user?.imageUrl ? (
                      <div className="w-[32px] h-[32px] rounded-full bg-gray-200 overflow-hidden">
                        <Image
                          src={user.imageUrl}
                          alt="Profile image"
                          height={36}
                          width={36}
                          quality={100}
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-[36px] h-[36px] rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
                        {user?.firstName?.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-primary font-semibold text-sm">
                        {user?.firstName ? user?.firstName : "Not available"}{" "}
                        {user?.lastName}
                      </p>
                      <p className="text-gray-500 text-xs truncate text-ellipsis max-w-[125px]">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    {/* Logout Button */}
                    <Button
                      className="p-2"
                      variant="ghost"
                      onClick={() => setOpen(true)}
                    >
                      <LogOut size={18} />
                    </Button>
                  </div>
                </SidebarMenuItem>

                {/* Logout Modal */}
                <LogoutModal open={open} handleToggle={() => setOpen(!open)} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default SidebarComponent;
