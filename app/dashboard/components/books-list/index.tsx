"use client";

import {
  Button,
  Card,
  Heading,
  StackItem,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";

import type { Book } from "@/app/types/book";

export function BooksList({
  books,
  onBookClick,
}: {
  books: Book[];
  onBookClick: (book: Book) => void;
}) {
  return books.map((book) => (
    <StackItem key={book.id} width="300px">
      <Card mt="4" backgroundColor="black" color="white">
        <CardHeader>
          <Heading size="md">{book.title}</Heading>
        </CardHeader>
        <CardFooter>
          <Button
            backgroundColor="gray.200"
            _hover={{
              backgroundColor: "gray.100",
            }}
            onClick={() => onBookClick(book)}
          >
            Continue Reading
          </Button>
        </CardFooter>
      </Card>
    </StackItem>
  ));
}
