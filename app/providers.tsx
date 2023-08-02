"use client";

import chakraTheme from "@chakra-ui/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { DatabaseProvider } from "./context/database";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <CacheProvider>
        <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
      </CacheProvider>
    </DatabaseProvider>
  );
}
