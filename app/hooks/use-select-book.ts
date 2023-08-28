import { useCallback } from "react";

import { useSetBook } from "./use-book";
import type { Book } from "@/app/types/book";

export function useSelectBook() {
  const setBook = useSetBook();

  return useCallback(
    (book: Book) => {
      setBook(book);
    },
    [setBook]
  );
}
