import { atom, useAtom } from "jotai";
import { extractBookMeta, viewBook } from "../lib/epub";
import { useCallback, useEffect, useState } from "react";
import { blobToArrayBuffer, fileToBlob } from "../utils";

import { useDatabase } from "@/app/context/database";

import type { Book } from "../types/book";
import { type Rendition } from "epubjs";

const screenAtom = atom<"landing" | "reading">("landing");
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

      saveBook({
        title: meta.title,
        cover: meta.cover,
        tableOfContent: meta.tableOfContent,
        blob,
      });
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

export function useReader() {
  const [rendition, setRendition] = useState<Rendition>(
    null as unknown as Rendition
  );

  const book = useBook();

  const next = useCallback(() => {
    if (!rendition) return;

    rendition.next();
  }, [rendition]);

  const previous = useCallback(() => {
    if (!rendition) return;

    rendition.prev();
  }, [rendition]);

  const view = useCallback(
    async (area) => {
      if (!book) return;

      const arraybuffer = await blobToArrayBuffer(book.blob);
      const rendition = await viewBook(area, arraybuffer);

      rendition.themes.fontSize("140%");
      rendition.themes.register("light", {
        body: { "background-color": "#FFFFFF", color: "#000000" },
      });
      rendition.themes.register("dark", {
        body: { "background-color": "#111111", color: "white" },
        html: {
          color: "white",
          // "-webkit-filter": "invert(1) hue-rotate(180deg)",
          // filter: "invert(1) hue-rotate(180deg)",
        },
        p: {
          color: "white",
        },
        li: {
          color: "white",
        },
        a: {
          color: "white!important",
        },
        i: {
          color: 'white!important'
        },
        '.black': {
          color: 'white'
        },
        img: {
          "-webkit-filter": "invert(1) hue-rotate(180deg)",
          filter: "invert(1) hue-rotate(180deg)",
        },
      });
      rendition.themes.select("dark");

      rendition.display();

      setRendition(rendition);
    },
    [book]
  );

  return {
    next,
    previous,
    view,
  };
}
