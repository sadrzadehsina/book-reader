import { useCallback } from "react";
import { nanoid } from "nanoid";

import type { DisplayedLocation } from "epubjs/types/rendition";

import { useDatabase } from "@/app/context/database";
import { extractBookMeta } from "@/app/lib/epub";
import { fileToBlob } from "@/app/utils";

export function useSaveBook() {
  const { saveBook } = useDatabase();

  return useCallback(
    async (files: File[]) => {
      const book = files[0];
      const meta = await extractBookMeta(book);
      const blob = await fileToBlob(book);

      return saveBook({
        id: nanoid(),
        author: meta.author,
        title: meta.title,
        cover: meta.cover,
        tableOfContent: meta.tableOfContent,
        blob,
        progress: null as unknown as DisplayedLocation,
      });
    },
    [saveBook]
  );
}