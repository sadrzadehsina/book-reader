import { localforage } from "./local-forge";

export const database = {
  saveBook(title: string, book: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
      localforage.setItem(title, book).then(resolve).catch(reject);
    });
  },

  getBooks(): Promise<Object[]> {
    return new Promise((resolve, reject) => {
      const books: Object[] = [];
      localforage
        .iterate(function (value, key) {
          books.push({
            title: key,
            blob: value,
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
