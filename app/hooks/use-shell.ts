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
        progress: meta.tableOfContent.at(0)?.href!,
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
      updateProgress(book.id, location.start.href);
    });
  }, [book.id, rendition, updateProgress]);

  const previous = useCallback(() => {
    if (!rendition) return;

    rendition.prev();
  }, [rendition]);

  const view = useCallback(
    async (area: HTMLElement) => {
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
          color: "white!important",
        },
        li: {
          color: "white",
        },
        a: {
          color: "white!important",
        },
        i: {
          color: "white!important",
        },
        ".black": {
          color: "white",
        },
        img: {
          "-webkit-filter": "invert(1) hue-rotate(180deg)",
          filter: "invert(1) hue-rotate(180deg)",
        },
      });
      rendition.themes.select("dark");

      rendition.display(book.progress);

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
