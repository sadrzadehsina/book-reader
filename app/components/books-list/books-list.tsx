import { Card, CardBody, Text } from "@chakra-ui/react";

export function BooksList({ books }: { books: Object[] }) {
  return books.map((book) => (
    <Card key={book.title} mt="4" backgroundColor="burlywood" color="black">
      <CardBody>
        <Text>{book.title}</Text>
      </CardBody>
    </Card>
  ));
}
