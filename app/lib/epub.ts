"use client";

import ePub, { type Rendition } from "epubjs";

import type { Book } from "@/app/types/book";

export function viewBook(
  area: HTMLElement,
  book: ArrayBuffer
): Promise<Rendition> {
  return new Promise((resolve, reject) => {
    const rendition = ePub(book).renderTo(area, {
      flow: "paginated",
      width: "100%",
      height: "100%",
    });
    resolve(rendition);
  });
}

export function extractBookMeta(
  file: File
): Promise<Omit<Book, "id" | "blob" | "progress">> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);

    Promise.all([
      book.loaded.cover,
      book.loaded.metadata,
      book.loaded.navigation,
    ]).then(([cover, metadata, navigation]) => {
      book.archive.createUrl(cover, { base64: true }).then((cover) => {
        resolve({
          cover,
          title: metadata.title,
          author: metadata.creator,
          tableOfContent: navigation.toc,
        });
      });
    });
  });
}
