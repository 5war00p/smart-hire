import { Chat } from "@/utils/types";
import React, { Dispatch, SetStateAction, useContext } from "react";

type ContextType = {
  query: string;
  chat: Chat;
};

export const AppStateContext = React.createContext<
  [ContextType, Dispatch<SetStateAction<ContextType>>] | null
>(null);

export const AppStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = React.useState<ContextType>({
    query: "",
    chat: [],
  });

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}
