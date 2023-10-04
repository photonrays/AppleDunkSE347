import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const initialState = {
  theme: "light",
  setTheme: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {}
};

export const MultiContext = createContext(initialState);

export function MultiContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MultiContext.Provider value={{ theme, setTheme, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </MultiContext.Provider>
  );
}

export const useMultiContext = () => useContext(MultiContext)
