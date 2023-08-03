import { Card, CardBody, Text } from "@chakra-ui/react";

export function BooksList({ books }: { books: Object[] }) {
  return books.map((book) => (
    <Card key={book.title}>
      <CardBody>
        <Text>{book.title}</Text>
      </CardBody>
    </Card>
  ));
}
