"use client";

import ePub from "epubjs";

import type { Book } from "../types/book";

export function viewBook(area: HTMLElement, book: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const rendition = ePub(book).renderTo(area, {
      flow: "scrolled-doc",
      width: "100%",
      height: "100%",
    });
    const displayed = rendition.display();

    displayed.then(resolve);
  });
}

export function extractBookMeta(file: File): Promise<Omit<Book, "blob">> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);

    Promise.all([book.loaded.cover, book.loaded.metadata]).then(
      ([cover, metadata]) => {
        resolve({
          cover,
          title: metadata.title,
        });
      }
    );
  });
}
