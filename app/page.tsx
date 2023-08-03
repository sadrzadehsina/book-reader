"use client";

import { Dropzone } from "./components/dropzone";

import { BooksList } from "./components/books-list";
import { useBooks, useFetchBooks, useSaveBook } from "./hooks/use-shell";
import { Box } from "@chakra-ui/react";

export default function Shell() {
  const books = useBooks();

  const saveBook = useSaveBook();

  useFetchBooks();

  return (
    <Box m="4">
      <Dropzone onDrop={saveBook} />
      <Box mt="4">
        <BooksList books={books} />
      </Box>
    </Box>
  );
}
