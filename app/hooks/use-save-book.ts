import { useCallback } from "react";
import { nanoid } from "nanoid";

import type { DisplayedLocation } from "epubjs/types/rendition";

import { useDatabase } from "@/app/context/database";
import { extractBookMeta } from "@/app/lib/epub";

import { Dropbox } from "dropbox";
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

export function useSaveBook() {
  const { saveBook } = useDatabase();

  return useCallback(
    async (files: File[]) => {
      const book = files[0];
      const meta = await extractBookMeta(book);

      dbx
        .filesUpload({
          path: `/${meta.title.toLowerCase().split(" ").join("-")}.epub`,
          contents: book,
        })
        .then((response) => {
          return saveBook({
            id: nanoid(),
            author: meta.author,
            title: meta.title,
            cover: meta.cover,
            tableOfContent: meta.tableOfContent,
            progress: null as unknown as DisplayedLocation,
            file: response.result.id,
          });
        })
        .catch((error) => console.log(error));
    },
    [saveBook]
  );
}
