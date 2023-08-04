"use client";

import Image from "next/image";
import { Button, Card, CardBody, Text } from "@chakra-ui/react";

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
    <Button key={book.title} onClick={() => onBookClick(book)}>
      <Card mt="4" backgroundColor="burlywood" color="black">
        <CardBody>
          <Image src={book.cover} alt={book.title} width={50} height={100} />
          <Text>{book.title}</Text>
        </CardBody>
      </Card>
    </Button>
  ));
}
