import { useCallback } from "react";

import { viewBook } from "../lib/epub";

import { useRenditionValue } from "../hooks/use-rendition";
import { useSetRendition } from "../hooks/use-rendition";
import { useBookValue } from "../hooks/use-book";
import { useDatabase } from "../context/database";
import { useDrawer } from "./components/drawer/use-drawer";

import { getBook } from "../actions/get-book";

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

      const file = await getBook(book.file);

      // @ts-ignore
      const rendition = await viewBook(area, `/${file}`);

      rendition.display().then(() => {
        if (book.progress) {
          // @ts-ignore
          rendition.display(book.progress.start.cfi);
        }

        setRendition(rendition);
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
