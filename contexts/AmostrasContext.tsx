import { AmostraData } from "@/types/AmostraData";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AmostrasContextType {
  dadosAmostras: AmostraData[];
  setDadosAmostras: React.Dispatch<React.SetStateAction<AmostraData[]>>;
}

const AmostrasContext = createContext<AmostrasContextType | undefined>(
  undefined
);

export function AmostrasProvider({ children }: { children: ReactNode }) {
  const [dadosAmostras, setDadosAmostras] = useState<AmostraData[]>([]);

  return (
    <AmostrasContext.Provider value={{ dadosAmostras, setDadosAmostras }}>
      {children}
    </AmostrasContext.Provider>
  );
}

export function useAmostras() {
  const context = useContext(AmostrasContext);
  if (!context) {
    throw new Error("useAmostras must be used within an AmostrasProvider");
  }
  return context;
}
