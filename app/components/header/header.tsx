"use client";

import { type ReactNode } from "react";
import { Box, HStack, Heading, StackItem } from "@chakra-ui/react";

export function Header({ children }: { children?: ReactNode }) {
  return (
    <Box p="6" backgroundColor="gray.900" color="white">
      <HStack>
        <StackItem>
          <Heading size="md">Code Nook - Book Reader</Heading>
        </StackItem>
        {children}
      </HStack>
    </Box>
  );
}
