"use client";

import type { Book } from "../types/book";

import { createContext, useContext, ReactNode, useMemo } from "react";

type DatabaseContextType = {
  saveBook: (book: Book) => Promise<Omit<Book, "title">>;
  getBooks: () => Promise<Book[]>;
  queryBook: (title: string) => Promise<Blob>;
  deleteBook: () => undefined;
  updateBook: () => undefined;
};

const DatabaseContext = createContext<DatabaseContextType>({
  saveBook: (book: Book) => Promise.resolve(null as unknown as Book),
  getBooks: () => Promise.resolve([]),
  queryBook: (title: string) => Promise.resolve(new Blob()),
  deleteBook: () => undefined,
  updateBook: () => undefined,
});

import { database } from "../lib/database";

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { saveBook, getBooks, deleteBook, queryBook, updateBook } = database;

  const state = useMemo<DatabaseContextType>(
    () => ({
      saveBook,
      getBooks,
      deleteBook,
      queryBook,
      updateBook,
    }),
    [deleteBook, getBooks, queryBook, saveBook, updateBook]
  );

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);
