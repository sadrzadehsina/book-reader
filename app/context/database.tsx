"use client";

import type { Book } from "@/app/types/book";

import { database } from "@/app/lib/database";
import { DisplayedLocation } from "epubjs/types/rendition";

import { createContext, useContext, ReactNode, useMemo } from "react";

type DatabaseContextType = {
  saveBook: (book: Book) => Promise<Boolean>;
  getBooks: () => Promise<Book[]>;
  updateProgress: (
    bookId: string,
    progress: DisplayedLocation
  ) => Promise<Boolean>;
};

const DatabaseContext = createContext<DatabaseContextType>({
  saveBook: (book: Book) => Promise.resolve(true),
  getBooks: () => Promise.resolve([]),
  updateProgress: (bookId: string, progress: DisplayedLocation) =>
    Promise.resolve(true),
});

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { saveBook, getBooks, updateProgress } = database;

  const state = useMemo<DatabaseContextType>(
    () => ({
      saveBook,
      getBooks,
      updateProgress,
    }),
    [getBooks, saveBook, updateProgress]
  );

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);
