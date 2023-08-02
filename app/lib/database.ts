import { localforage } from "./local-forge";

export const database = {
  saveBook(bookId: string, book: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
      localforage.setItem(bookId, book).then(resolve).catch(reject);
    });
  },

  queryBook() {
    return undefined;
  },

  deleteBook() {
    return undefined;
  },

  updateBook() {
    return undefined;
  },
};
