"use client";

import type { Book } from "@/app/types/book";

import { database } from "@/app/lib/database";
import { DisplayedLocation } from "epubjs/types/rendition";

import { createContext, useContext, ReactNode, useMemo } from "react";

type DatabaseContextType = {
  saveBook: (book: Book) => Promise<Omit<Book, "id">>;
  getBooks: () => Promise<Book[]>;
  queryBook: (title: string) => Promise<Blob>;
  deleteBook: () => undefined;
  updateBook: () => undefined;
  updateProgress: (
    bookId: string,
    progress: DisplayedLocation
  ) => Promise<Omit<Book, "id">>;
};

const DatabaseContext = createContext<DatabaseContextType>({
  saveBook: (book: Book) => Promise.resolve(null as unknown as Book),
  getBooks: () => Promise.resolve([]),
  queryBook: (title: string) => Promise.resolve(new Blob()),
  deleteBook: () => undefined,
  updateBook: () => undefined,
  updateProgress: (bookId: string, progress: DisplayedLocation) =>
    Promise.resolve(null as unknown as Book),
});

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const {
    saveBook,
    getBooks,
    deleteBook,
    queryBook,
    updateBook,
    updateProgress,
  } = database;

  const state = useMemo<DatabaseContextType>(
    () => ({
      saveBook,
      getBooks,
      deleteBook,
      queryBook,
      updateBook,
      updateProgress,
    }),
    [deleteBook, getBooks, queryBook, saveBook, updateBook, updateProgress]
  );

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);
