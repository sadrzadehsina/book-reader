"use client";

import { Container, Flex } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";

export function Dashboard() {
  return (
    <Container w="full" h="full" maxW="full">
      <Flex w="full" h="full" maxW="full" maxH="full">
        <Box border="1px solid">Menu</Box>
        <Box flex="1">
          <Flex flexDir="column" w="full" h="full" maxW="full" maxH="full">
            <Box border="1px solid">Good Morning, Sina</Box>
            <Box border="1px solid">Dropzone</Box>
            <Box flex="1" border="1px solid">
              Books
            </Box>
          </Flex>
        </Box>
        <Box border="1px solid">Summary</Box>
      </Flex>
    </Container>
  );
}
