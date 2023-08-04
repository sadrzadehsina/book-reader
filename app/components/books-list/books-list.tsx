"use client";

import Image from "next/image";
import { Card, CardBody, Text } from "@chakra-ui/react";

import type { Book } from "@/app/types/book";

export function BooksList({ books }: { books: Book[] }) {
  return books.map((book) => (
    <Card key={book.title} mt="4" backgroundColor="burlywood" color="black">
      <CardBody>
        <Image src={book.cover} alt={book.title} width={50} height={100} />
        <Text>{book.title}</Text>
      </CardBody>
    </Card>
  ));
}
