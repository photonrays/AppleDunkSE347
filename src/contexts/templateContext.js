import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TemplateContext = createContext(null);

export function TemplateContextProvider({ children }) {
  const [template, setTemplate] = useState(() => {
    return sessionStorage.getItem("template") || 1
  });

  useEffect(() => {
    sessionStorage.setItem("template", template)
  }, [template])

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemplateContext = () => useContext(TemplateContext)
