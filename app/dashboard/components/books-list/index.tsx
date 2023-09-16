"use client";

import {
  Box,
  Heading,
  Flex,
  Image,
  Button,
  SimpleGrid
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
    <SimpleGrid columns={4} spacing={10}>
      {books.map((book) => (
        <Box key={book.id} h="500">
          <Button
            variant="unstyled"
            onClick={() => onBookClick(book)}
            _hover={{
              color: "#5b4eea",
            }}
          >
            <Flex flexDir="column" gap="4" align="flex-start" w={250} h={400}>
              <Box>
                <Image
                  src={book.cover}
                  alt={book.title}
                  borderRadius="lg"
                  objectFit="cover"
                  w="250px"
                  minW="250px"
                  h="400px"
                  minH="400px"
                />
              </Box>
              <Box textAlign="start">
                <Heading size="md" whiteSpace="normal">
                  {book.title}
                </Heading>
              </Box>
              <Box>
                <Heading size="sm" color="gray">
                  {book.author}
                </Heading>
              </Box>
            </Flex>
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  );
}
