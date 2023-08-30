"use client";

import {
  Box,
  Heading,
  StackItem,
  HStack,
  Flex,
  Image,
  Button,
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
        <StackItem key={book.id}>
          <Button variant="link" onClick={() => onBookClick(book)}>
            <Flex flexDir="column" gap="4" align="flex-start">
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
                <Heading size="sm" color="gray">
                  {book.author}
                </Heading>
              </Box>
            </Flex>
          </Button>
        </StackItem>
      ))}
    </HStack>
  );
}
