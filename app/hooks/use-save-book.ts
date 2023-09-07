import { useCallback } from "react";
import { nanoid } from "nanoid";

import type { DisplayedLocation } from "epubjs/types/rendition";

import { useDatabase } from "@/app/context/database";
import { extractBookMeta } from "@/app/lib/epub";

export function useSaveBook() {
  const { saveBook } = useDatabase();

  return useCallback(
    async (files: File[]) => {
      const book = files[0];
      const meta = await extractBookMeta(book);

      return saveBook({
        id: nanoid(),
        author: meta.author,
        title: meta.title,
        cover: meta.cover,
        tableOfContent: meta.tableOfContent,
        progress: null as unknown as DisplayedLocation,
        file: book,
      });
    },
    [saveBook]
  );
}
