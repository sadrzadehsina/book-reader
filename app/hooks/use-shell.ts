import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { extractBookMeta, viewBook } from "../lib/epub";
import { useCallback, useEffect, useId, useState } from "react";
import { blobToArrayBuffer, fileToBlob } from "../utils";

import { useDatabase } from "@/app/context/database";

import { type Book } from "../types/book";
import { type Rendition } from "epubjs";

import { nanoid } from "nanoid";
import { DisplayedLocation } from "epubjs/types/rendition";

const screenAtom = atom<"landing" | "reading">("landing");
const bookAtom = atom<Book>(null as unknown as Book);
const renditionAtom = atom<Rendition>(null as unknown as Rendition);
const booksAtom = atom<Book[]>([]);

export const useScreenValue = () => useAtomValue(screenAtom);
export const useScreenSet = () => useSetAtom(screenAtom);

export const useBook = () => {
  const [book] = useAtom(bookAtom);
  return book;
};

export const useRenditionValue = () => useAtomValue(renditionAtom);

export const useRenditionSet = () => useSetAtom(renditionAtom);

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
        id: nanoid(),
        title: meta.title,
        cover: meta.cover,
        tableOfContent: meta.tableOfContent,
        blob,
        progress: null as unknown as DisplayedLocation,
      });
    },
    [saveBook]
  );
}

export function useFetchBooks() {
  const setBooksAtom = useSetAtom(booksAtom);

  const { getBooks } = useDatabase();

  useEffect(() => {
    async function fetchAllBooks() {
      getBooks().then(setBooksAtom);
    }

    fetchAllBooks();
  }, [getBooks, setBooksAtom]);
}

export function useSelectBook() {
  const setBook = useSetAtom(bookAtom);

  return useCallback(
    (book: Book) => {
      setBook(book);
    },
    [setBook]
  );
}

export function useReader() {
  const rendition = useRenditionValue();

  const setRendition = useRenditionSet();

  const book = useBook();

  const { updateProgress } = useDatabase();

  const next = useCallback(() => {
    if (!rendition) return;

    rendition.next().then(() => {
      const location: DisplayedLocation = rendition.currentLocation();
      updateProgress(book.id, location);
    });
  }, [book.id, rendition, updateProgress]);

  const previous = useCallback(() => {
    if (!rendition) return;

    const location: DisplayedLocation = rendition.currentLocation();
    updateProgress(book.id, location);
    rendition.prev();
  }, [book.id, rendition, updateProgress]);

  const view = useCallback(
    async (area: HTMLElement) => {
      if (!book) return;

      const arraybuffer = await blobToArrayBuffer(book.blob);
      const rendition = await viewBook(area, arraybuffer);

      rendition.themes.fontSize("100%");
      rendition.themes.register("dark", {
        "body, p, h1, h2, h3, h4, h5, h6, ul, li": {
          "background-color": "#111111",
          color: "#F8F8F8!important",
        },
        a: {
          "background-color": "#111111",
          color: "#F8F8F8!important",

          "text-decoration": "none",
        },
        "a:hover": {
          "background-color": "#111111",
          color: "#F8F8F8!important",
          "text-decoration": "underline",
        },
        "span.black": {
          "background-color": "#111111",
          color: "#F8F8F8!important",
        },
      });
      rendition.themes.select("dark");
      rendition.display();

      if (book.progress) {
        // @ts-ignore
        rendition.display(book.progress.start.cfi);
      }

      setRendition(rendition);
    },
    [book, setRendition]
  );

  return {
    next,
    previous,
    view,
  };
}
