import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TemplateContext = createContext(null);

export function TemplateContextProvider({ children }) {
  const [template, setTemplate] = useState(1);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemplateContext = () => useContext(TemplateContext)
