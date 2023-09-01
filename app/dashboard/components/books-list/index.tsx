"use client";

import {
  Box,
  Heading,
  StackItem,
  HStack,
  Flex,
  Image,
  Button,
  ButtonGroup,
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
          <ButtonGroup>
            <Button variant="unstyled" onClick={() => onBookClick(book)}>
              <Flex flexDir="column" gap="4" align="flex-start">
                <Box>
                  <Image
                    src={book.cover}
                    alt={book.title}
                    borderRadius="lg"
                    objectFit="cover"
                    w="350px"
                    minW="350px"
                    h="450px"
                    minH="450px"
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
          </ButtonGroup>
        </StackItem>
      ))}
    </HStack>
  );
}
