"use client";

import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  StackItem,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";

import type { Book } from "@/app/types/book";
import { MouseEventHandler } from "react";

export function BooksList({
  books,
  onBookClick,
}: {
  books: Book[];
  onBookClick: MouseEventHandler;
}) {
  return books.map((book) => (
    <StackItem key={book.title} width="300px">
      <Card mt="4">
        <CardHeader>
          <Heading size="md">{book.title}</Heading>
        </CardHeader>
        <CardFooter>
          <Button colorScheme="twitter" onClick={() => onBookClick(book)}>Continue Reading</Button>
        </CardFooter>
      </Card>
    </StackItem>
  ));
}
