import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
    isMapModalOpen: {
    someValue: string;
    editMode: boolean; 
  };
  setMapModalOpen: React.Dispatch<React.SetStateAction<{ someValue: string; editMode: boolean }>>;
}

const defaultContextValue: AppContextType = {
    isMapModalOpen: { someValue: "", editMode: false },
    setMapModalOpen: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMapModalOpen, setMapModalOpen] = useState({ someValue: "", editMode: false });

  const value = {
    isMapModalOpen,
    setMapModalOpen,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
