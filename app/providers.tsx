"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { DatabaseProvider } from "./context/database";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </DatabaseProvider>
  );
}
