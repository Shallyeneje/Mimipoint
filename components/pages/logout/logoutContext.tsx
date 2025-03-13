"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "./LogoutModal";

const LogoutContext = createContext({ triggerLogout: () => {} });

export function LogoutProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const triggerLogout = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    // Clear user session (you can add your own logic here)
    localStorage.removeItem("token"); // Example: remove token from localStorage
    router.push("/Login"); 
  };

  return (
    <LogoutContext.Provider value={{ triggerLogout }}>
      {children}

      {/* Global Logout Modal */}
      {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogout={handleLogout} />}
    </LogoutContext.Provider>
  );
}

export function useLogout() {
  return useContext(LogoutContext);
}
