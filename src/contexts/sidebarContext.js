import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const initialState = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => {}
};

export const SidebarContext = createContext(initialState);

export function SidebarContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSideBarContext = () => useContext(SidebarContext)
