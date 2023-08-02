"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

const DatabaseContext = createContext(null);

import { database } from "../lib/database";

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { saveBook, deleteBook, queryBook, updateBook } = database;

  const state = useMemo(
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
