"use client";

import ePub from "epubjs";

type BookMeta = {
  title: string;
}

export function parseBook(file: File): Promise<BookMeta> {
  const book = ePub(file as unknown as ArrayBuffer);

  return new Promise((resolve, reject) => {
    book.loaded.metadata.then((metadata) => {
      resolve({
        title: metadata.title,
      });
    });
  });
}
