"use client";

import ePub, { type Rendition } from "epubjs";

import type { Book } from "../types/book";

export function viewBook(
  area: HTMLElement,
  book: ArrayBuffer
): Promise<Rendition> {
  return new Promise((resolve, reject) => {
    const rendition = ePub(book).renderTo(area, {
      flow: "scrolled-doc",
      width: "100%",
      height: "100%",
    });
    resolve(rendition);
  });
}

export function extractBookMeta(file: File): Promise<Omit<Book, "blob">> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);

    Promise.all([
      book.loaded.cover,
      book.loaded.metadata,
      book.loaded.navigation,
    ]).then(([cover, metadata, navigation]) => {
      resolve({
        cover,
        title: metadata.title,
        tableOfContent: navigation.toc,
      });
    });
  });
}
