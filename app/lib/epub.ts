"use client";

import ePub from "epubjs";

import type { Book } from "../types/book";

export function viewBook(area: HTMLElement, file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    // file.arrayBuffer().then((arrayBuffer) => {
    const book = ePub(
      "https://github.com/IDPF/epub3-samples/releases/download/20230704/accessible_epub_3.epub"
    );
    const rendition = book.renderTo(area, {
      flow: "scrolled-doc",
      width: "700px",
      height: "700px",
    });
    const displayed = rendition.display();

    displayed.then(resolve);
    // });
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
