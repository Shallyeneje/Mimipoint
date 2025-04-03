"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/shared/navbar";
import SidebarComponent from "@/components/shared/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar
        activeRoute="Dashboard"
        toggleSidebar={() => console.log("Toggled Sidebar")}
      />

      {/* Sidebar and Content Layout */}
      <div>
        <SidebarProvider>
          <SidebarComponent />
          <main className=" w-screen">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default MainLayout;
