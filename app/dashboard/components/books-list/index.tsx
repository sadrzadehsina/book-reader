"use client";

import {
  Box,
  Heading,
  StackItem,
  HStack,
  Flex,
  Image,
} from "@chakra-ui/react";

import type { Book } from "@/app/types/book";

export function BooksList({
  books,
  onBookClick,
}: {
  books: Book[];
  onBookClick: (book: Book) => void;
}) {
  return (
    <HStack align="flex-start" gap="8">
      {books.map((book) => (
        <StackItem key={book.id} width="250px">
          <Flex flexDir="column" gap="4">
            <Box>
              <Image
                src="https://via.placeholder.com/250"
                alt="Dan Abramov"
                borderRadius="lg"
                objectFit="cover"
              />
            </Box>
            <Box>
              <Heading size="md">{book.title}</Heading>
            </Box>
            <Box>
              <Heading size="sm">sina sadrzadeh</Heading>
            </Box>
          </Flex>
        </StackItem>
      ))}
    </HStack>
  );
}
