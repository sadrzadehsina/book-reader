"use client";

import {
  useScreenSet,
  useFetchBooks,
  useSelectBook,
} from "@/app/hooks/use-shell";
import { useBooks } from "@/app/hooks/use-shell";
import { useSaveBook } from "@/app/hooks/use-shell";
import { Book } from "@/app/types/book";
import { Box, HStack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { Dropzone } from "../dropzone";
import { BooksList } from "../books-list";
import { Header } from "../header/header";

export function Landing() {
  const fetchBooks = useFetchBooks();

  const setScreen = useScreenSet();

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

  const saveBookAndRefetch = useCallback(
    async (files: File[]) => {
      await saveBook(files);
      fetchBooks();
    },
    [fetchBooks, saveBook]
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <Header />
      <Box m="6">
        <Dropzone onDrop={saveBookAndRefetch} />
        <HStack spacing="5" align="start">
          <BooksList books={books} onBookClick={selectBookAndOpenReading} />
        </HStack>
      </Box>
    </>
  );
}
