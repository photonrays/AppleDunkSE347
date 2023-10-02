import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const initialState = {
  theme: "light",
  setTheme: () => {}
};

export const ThemeContext = createContext(initialState);

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext)
