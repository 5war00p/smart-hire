"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppStateContextProvider } from "@/hooks/useAppContext";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppStateContextProvider>{children}</AppStateContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
