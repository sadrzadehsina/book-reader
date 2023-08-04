import { atom, useAtom } from "jotai";
import { extractBookMeta } from "../lib/epub";
import { useCallback, useEffect } from "react";
import { fileToBlob } from "../utils";

import { useDatabase } from "@/app/context/database";

import type { Book } from "../types/book";

const screenAtom = atom<"uploading" | "reading">("uploading");
const bookAtom = atom<Book>(null as unknown as Book);
const booksAtom = atom<Book[]>([]);

export const useScreen = () => useAtom(screenAtom);

export const useBook = () => {
  const [book] = useAtom(bookAtom);
  return book;
};

export const useBooks = () => {
  const [books] = useAtom(booksAtom);
  return books;
};

export function useSaveBook() {
  const { saveBook } = useDatabase();

  return useCallback(
    async (files: File[]) => {
      const book = files[0];
      const meta = await extractBookMeta(book);
      const blob = await fileToBlob(book);

      saveBook({ title: meta.title, cover: meta.cover, blob });
    },
    [saveBook]
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

export function useSelectBook() {
  const [_, setBook] = useAtom(bookAtom);

  return useCallback(
    (book: Book) => {
      setBook(book);
    },
    [setBook]
  );
}
