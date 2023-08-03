import { atom, useAtom } from "jotai";
import { extractBookMeta } from "../lib/epub";
import { useCallback, useEffect } from "react";
import { fileToBlob } from "../utils";

import { useDatabase } from "@/app/context/database";

const screenAtom = atom<"uploading" | "reading">("uploading");
const bookAtom = atom<Object>(null as unknown as Object);
const booksAtom = atom<Object[]>([]);

export const useScreen = () => useAtom(screenAtom);

export const useBook = () => useAtom(bookAtom);

export const useBooks = () => {
  const [books] = useAtom(booksAtom)

  return books;
}

export function useSaveBook() {
  const [_, setBook] = useAtom(bookAtom);

  const { saveBook } = useDatabase();

  return useCallback(
    async (files: File[]) => {
      const book = files[0];
      const meta = await extractBookMeta(book);
      const blob = await fileToBlob(book);

      // save book in db
      saveBook(meta.title, blob);

      setBook({
        meta,
        blob,
      });
    },
    [saveBook, setBook]
  );
}

export function useFetchBooks() {
  const [_, setBooksAtom] = useAtom(booksAtom);

  const { getBooks } = useDatabase();

  useEffect(() => {
    async function fetchAllBooks() {
      getBooks().then((books) => {
        setBooksAtom(books);
      });
    }

    fetchAllBooks();
  }, [getBooks, setBooksAtom]);
}
