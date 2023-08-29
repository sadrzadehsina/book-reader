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
import { useEffect } from "react";
import { useBooksValue } from "../hooks/use-books";
import { BooksList } from "./components/books-list";
import { useSaveBook } from "../hooks/use-save-book";
import { useBookValue } from "../hooks/use-book";

export function Dashboard() {
  const fetchBooks = useFetchBooks();

  const books = useBooksValue();

  const saveBook = useSaveBook();

  const selectedBook = useBookValue();

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
                fontSize="20"
                colorScheme="facebook"
                icon={<LiaHomeSolid />}
              />
            </Box>
            <Box>
              <IconButton
                aria-label="Search database"
                size="lg"
                fontSize="20"
                variant="ghost"
                icon={<LiaHeart />}
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
              <Dropzone onDrop={saveBook} />
            </Box>
            <Box pr="8" pl="8"><Heading size="md">Your Books</Heading></Box>
            <Box flex="1" pr="8" pl="8">
              <BooksList books={books} />
            </Box>
          </Flex>
        </Box>
        {selectedBook && <Box p="8">Summary</Box> }
      </Flex>
    </Container>
  );
}
