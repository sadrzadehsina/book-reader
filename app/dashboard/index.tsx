"use client";

import {
  Container,
  Flex,
  Avatar,
  Divider,
  IconButton,
  Heading,
} from "@chakra-ui/react";

import { LiaHomeSolid, LiaHeart } from "react-icons/lia";

import { Box } from "@chakra-ui/react";
import { Dropzone } from "./components/dropzone";
import { useFetchBooks } from "@/app/hooks/use-fetch-books";
import { useCallback, useEffect } from "react";
import { useBooksValue } from "../hooks/use-books";
import { BooksList } from "./components/books-list";
import { useSaveBook } from "../hooks/use-save-book";
import { useSelectBook } from "../hooks/use-select-book";
import { Book } from "../types/book";
import { useSetScreen } from "../hooks/use-screen";

export function Dashboard() {
  const fetchBooks = useFetchBooks();

  const books = useBooksValue();

  const saveBook = useSaveBook();

  const selectBook = useSelectBook();

  const setScreen = useSetScreen();

  const selectBookAndOpenReader = useCallback(
    (book: Book) => {
      selectBook(book);
      setScreen("reader");
    },
    [selectBook, setScreen]
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Container w="full" h="full" maxW="full" p="0" backgroundColor="#FCFCFC">
      <Flex w="full" h="full" maxW="full" maxH="full">
        <Box p="8" backgroundColor="white">
          <Flex flexDir="column" gap="8">
            <Box>
              <Avatar name="Sina Sadrzadeh" />
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box>
              <IconButton
                aria-label="Search database"
                size="lg"
                fontSize="25"
                fontWeight="bold"
                variant="custom-primary"
                icon={<LiaHomeSolid />}
              />
            </Box>
          </Flex>
        </Box>
        <Box flex="1">
          <Flex
            flexDir="column"
            w="full"
            h="full"
            maxW="full"
            maxH="full"
            gap="8"
          >
            <Box pr="8" pl="8" pt="8">
              <Heading>Good Morning, Sina</Heading>
            </Box>
            <Box pr="8" pl="8">
              {/* <form action={saveBook}> */}
              <Dropzone onDrop={saveBook} />
              {/* </form> */}
            </Box>
            <Box pr="8" pl="8">
              <Heading size="md">Your Books</Heading>
            </Box>
            <Box flex="1" pr="8" pl="8">
              <BooksList books={books} onBookClick={selectBookAndOpenReader} />
            </Box>
          </Flex>
        </Box>
        {/* {selectedBook && <Box p="8">Summary</Box>} */}
      </Flex>
    </Container>
  );
}
