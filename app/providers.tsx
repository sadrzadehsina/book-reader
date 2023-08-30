"use client";

import "@fontsource/inter";
import "@fontsource/roboto";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { DatabaseProvider } from "./context/database";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        "custom-primary": {
          textColor: "#F3E0EC",
          bg: "#5b4eea",
          borderColor: "#27233A!important",
          border: "4px",
          borderBottom: "8px",
          borderRadius: "lg",
          "&:hover": {
            border: "4px",
            borderTop: "4px",
          },
        },
      },
    },
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
