"use client";

import { useScreen, useFetchBooks, useSelectBook } from "@/app/hooks/use-shell";
import { useBooks } from "@/app/hooks/use-shell";
import { useSaveBook } from "@/app/hooks/use-shell";
import { Book } from "@/app/types/book";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { Dropzone } from "../dropzone";
import { BooksList } from "../books-list";

export function Landing() {
  useFetchBooks();

  const [_, setScreen] = useScreen();

  const books = useBooks();

  const saveBook = useSaveBook();

  const selectBook = useSelectBook();

  const selectBookAndOpenReading = useCallback(
    (book: Book) => {
      selectBook(book);
      setScreen("reading");
    },
    [selectBook, setScreen]
  );

  return (
    <Box m="4">
      <Dropzone onDrop={saveBook} />
      <Box mt="4">
        <BooksList books={books} onBookClick={selectBookAndOpenReading} />
      </Box>
    </Box>
  );
}
