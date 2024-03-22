import React, { createContext, useContext, useState, ReactNode } from "react";
import { TitleContextValue } from "../types";

interface TitleContextProps {
  children: ReactNode;
}

export const TitleContext = createContext<TitleContextValue | undefined>(
  undefined
);

export const TitleProvider: React.FC<TitleContextProps> = ({ children }) => {
  const [title, setTitle] = useState<string>("Dashboard");
  const [uerProfile, SetUserProfile] = useState<any>(null);

  const contextValue: any = [title, setTitle, uerProfile, SetUserProfile];

  return (
    <TitleContext.Provider value={contextValue}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
};
