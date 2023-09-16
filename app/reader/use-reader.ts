import { useCallback } from "react";

import { viewBook } from "../lib/epub";

import { useRenditionValue } from "../hooks/use-rendition";
import { useSetRendition } from "../hooks/use-rendition";
import { useBookValue } from "../hooks/use-book";
import { useDrawer } from "./components/drawer/use-drawer";

import { Dropbox } from "dropbox";
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

export function useReader() {
  const rendition = useRenditionValue();

  const setRendition = useSetRendition();

  const book = useBookValue();

  const [_, openTableOfContent] = useDrawer();

  const next = useCallback(() => {
    if (!rendition) return;
    rendition.next();
  }, [rendition]);

  const previous = useCallback(() => {
    if (!rendition) return;
    rendition.prev();
  }, [rendition]);

  const view = useCallback(
    async (area: HTMLElement) => {
      if (!book) return;

      dbx.filesDownload({ path: book.file }).then((response) => {
        // @ts-ignore
        viewBook(area, response.result.fileBlob).then((rendition) => {
          rendition.display().then(() => {
            if (book.progress) {
              // @ts-ignore
              rendition.display(book.progress.start.cfi);
            }

            setRendition(rendition);
          });
        });
      });
    },
    [book, setRendition]
  );

  return {
    next,
    previous,
    openTableOfContent,
    view,
  };
}
