import { localforage } from "./local-forage";

import type { Book } from "../types/book";

export const database = {
  saveBook({
    title,
    cover,
    tableOfContent,
    blob,
  }: Book): Promise<Omit<Book, "title">> {
    return new Promise((resolve, reject) => {
      localforage
        .setItem(title, { cover, tableOfContent, blob })
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
            title: key,
            cover: (value as Book).cover,
            tableOfContent: (value as Book).tableOfContent,
            blob: (value as Book).blob,
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
};
