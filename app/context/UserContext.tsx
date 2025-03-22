// contexts/UserContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the user data type
type User = {
  username?: string;
  email: string;
  token: string;
};

// Define context type
type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      // Check for saved user data in localStorage
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
