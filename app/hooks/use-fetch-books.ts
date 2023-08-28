import { useCallback } from "react";
import { useSetBooks } from "./use-books";
import { useDatabase } from "@/app/context/database";

export function useFetchBooks() {
  const setBooks = useSetBooks();

  const { getBooks } = useDatabase();

  return useCallback(() => {
    getBooks().then(setBooks);
  }, [getBooks, setBooks]);
}
