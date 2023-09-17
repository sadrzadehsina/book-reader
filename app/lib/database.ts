import type { Book } from "@/app/types/book";
import { DisplayedLocation } from "epubjs/types/rendition";
import { getBooks } from "../actions/get-books";
import { saveBook } from "../actions/save-book";
import { updateProgress } from "../actions/update-progress";

export const database = {
  saveBook(book: Book): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      saveBook({
        ...book,
      })
        .then(() => resolve(true))
        .catch(reject);
    });
  },

  getBooks(): Promise<[]> {
    return new Promise((resolve, reject) => {
      getBooks()
        .then((books) => {
          resolve(
            // @ts-ignore
            books.map((book) => ({
              ...book,
              progress: JSON.parse(book.progress),
            }))
          );
        })
        .catch(reject);
    });
  },

  updateProgress(
    bookId: string,
    progress: DisplayedLocation
  ): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      updateProgress(bookId, JSON.stringify(progress))
        .then(() => resolve(true))
        .catch(reject);
    });
  },
};
