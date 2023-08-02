import { localforage } from "./local-forge";

export const database = {
  saveBook(bookId, book) {
    return new Promise((resolve, reject) => {
      localforage.setItem(bookId, book).then(resolve).catch(reject);
    });
  },

  queryBook() {
    throw new Error("Not Implemented");
  },

  deleteBook() {
    throw new Error("Not Implemented");
  },

  updateBook() {
    throw new Error("Not Implemented");
  },
};
