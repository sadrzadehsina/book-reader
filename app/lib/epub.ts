"use client";

import ePub from "epubjs";

export function renderBook(book) {
  // const book = ePub(url);
  // const rendition = book.renderTo(area);
  // return rendition.display();
}

export function extractMeta(book) {
  return ePub(book);
}

export function parseBook(file) {
  const book = ePub(file);

  return new Promise((resolve, reject) => {
    book.loaded.metadata.then((metadata) => {
      resolve({
        title: metadata.title,
      });
    });
  });
}
