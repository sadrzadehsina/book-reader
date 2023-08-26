"use client";

import {
  Container,
  Flex,
  HStack,
  StackItem,
  VStack
} from '@chakra-ui/react'

import {
  useScreenSet,
  useFetchBooks,
  useSelectBook,
} from "@/app/hooks/use-shell";
import { useBooks } from "@/app/hooks/use-shell";
import { useSaveBook } from "@/app/hooks/use-shell";
import { Book } from "@/app/types/book";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { Dropzone } from "../dropzone";
import { BooksList } from "../books-list";
import { Header } from "../header/header";

import { Greeting } from '../greeting';

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
    // <>
    //   <Header />
    //   <Box m="6">
    //     <Dropzone onDrop={saveBookAndRefetch} />
    //     <HStack spacing="5" align="start">
    //       <BooksList books={books} onBookClick={selectBookAndOpenReading} />
    //     </HStack>
    //   </Box>
    // </>
    <Container w="full" h="full" maxW="full">
      <Flex w="full" h="full" maxW="full" maxH="full">
        <Box border="1px solid">Menu</Box>
        <Box flex="1">
          <Flex flexDir="column" w="full" h="full" maxW="full" maxH="full">
            <Box border="1px solid"><Greeting /></Box>
            <Box border="1px solid">Dropzone</Box>
            <Box flex="1" border="1px solid">Books</Box>
          </Flex>
        </Box>
        <Box border="1px solid">Summary</Box>
      </Flex>
    </Container>
  );
}
