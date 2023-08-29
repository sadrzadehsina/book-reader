"use client";

import '@fontsource/inter'
import '@fontsource/roboto'

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { DatabaseProvider } from "./context/database";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </DatabaseProvider>
  );
}
