"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

type DatabaseContextType = {
  saveBook: (title: string, file: Blob) => Promise<Blob>;
  getBooks: () => Promise<Object[]>;
  queryBook: (title: string) => Promise<Blob>;
  deleteBook: () => undefined;
  updateBook: () => undefined;
};

const DatabaseContext = createContext<DatabaseContextType>({
  saveBook: (title: string, file: Blob) => Promise.resolve(new Blob()),
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
