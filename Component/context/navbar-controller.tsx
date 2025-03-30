// app/context/navbar-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavbarContextType = {
  showNavbar: boolean;
  setShowNavbar: (value: boolean) => void;
  isDarkText: boolean;
  setIsDarkText: (value: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);

  return (
    <NavbarContext.Provider
      value={{ showNavbar, setShowNavbar, isDarkText, setIsDarkText }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

// Hook for consuming context
export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
