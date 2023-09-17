"use client";

import ePub, { NavItem, type Rendition } from "epubjs";

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
): Promise<Omit<Book, "id" | "blob" | "progress" | "file">> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);

    Promise.all([book.loaded.cover, book.loaded.metadata]).then(
      ([cover, metadata]) => {
        book.archive.createUrl(cover, { base64: true }).then((cover) => {
          resolve({
            cover,
            title: metadata.title,
            author: metadata.creator,
          });
        });
      }
    );
  });
}

export function extractTableOfContent(file: File): Promise<NavItem[]> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);

    book.loaded.navigation.then((navigation) => {
      resolve(navigation.toc);
    });
  });
}
