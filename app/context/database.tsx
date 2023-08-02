"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

type DatabaseContextType = {
  saveBook: (id: string, file: Blob) => Promise<Blob>;
  deleteBook: () => undefined;
  queryBook: () => undefined;
  updateBook: () => undefined;
};

const DatabaseContext = createContext<DatabaseContextType>({
  saveBook: (id: string, file: Blob) => Promise.resolve(new Blob),
  deleteBook: () => undefined,
  queryBook: () => undefined,
  updateBook: () => undefined,
});

import { database } from "../lib/database";

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { saveBook, deleteBook, queryBook, updateBook } = database;

  const state = useMemo<DatabaseContextType>(
    () => ({
      saveBook,
      deleteBook,
      queryBook,
      updateBook,
    }),
    [deleteBook, queryBook, saveBook, updateBook]
  );

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);
