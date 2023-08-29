import { localforage } from "./local-forage";

import type { Book } from "@/app/types/book";
import { DisplayedLocation } from "epubjs/types/rendition";

export const database = {
  saveBook({
    id,
    author,
    title,
    cover,
    tableOfContent,
    blob,
    progress,
  }: Book): Promise<Omit<Book, "id">> {
    return new Promise((resolve, reject) => {
      localforage
        .setItem(id, { author, title, cover, tableOfContent, blob, progress })
        .then(resolve)
        .catch(reject);
    });
  },

  getBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      const books: Book[] = [];
      localforage
        .iterate(function (value, key) {
          books.push({
            id: key,
            author: (value as Book).author,
            title: (value as Book).title,
            cover: (value as Book).cover,
            tableOfContent: (value as Book).tableOfContent,
            blob: (value as Book).blob,
            progress: (value as Book).progress,
          });
        })
        .then(() => {
          resolve(books);
        });
    });
  },

  queryBook(title: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      localforage
        .getItem(title)
        .then((book) => resolve(book as Blob))
        .catch(reject);
    });
  },

  deleteBook() {
    return undefined;
  },

  updateBook() {
    return undefined;
  },

  updateProgress(bookId: string, progress: DisplayedLocation): Promise<Omit<Book, "id">> {
    return new Promise((resolve, reject) => {
      localforage.getItem(bookId).then((book) => {
        (book as Book).progress = progress;
        localforage
          .setItem(bookId, book as Book)
          .then(resolve)
          .catch(reject);
      });
    });
  },
};
