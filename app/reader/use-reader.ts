import { useCallback } from "react";

import type { DisplayedLocation } from "epubjs/types/rendition";

import { blobToArrayBuffer } from "../utils";
import { viewBook } from "../lib/epub";

import { useRenditionValue } from "../hooks/use-rendition";
import { useSetRendition } from "../hooks/use-rendition";
import { useBookValue } from "../hooks/use-book";
import { useDatabase } from "../context/database";

export function useReader() {
  const rendition = useRenditionValue();

  const setRendition = useSetRendition();

  const book = useBookValue();

  const { updateProgress } = useDatabase();

  const next = useCallback(() => {
    if (!rendition) return;

    rendition.next().then(() => {
      const location: DisplayedLocation = rendition.currentLocation();
      updateProgress(book.id, location);
    });
  }, [book.id, rendition, updateProgress]);

  const previous = useCallback(() => {
    if (!rendition) return;

    const location: DisplayedLocation = rendition.currentLocation();
    updateProgress(book.id, location);
    rendition.prev();
  }, [book.id, rendition, updateProgress]);

  const view = useCallback(
    async (area: HTMLElement) => {
      if (!book) return;

      const arraybuffer = await blobToArrayBuffer(book.blob);
      const rendition = await viewBook(area, arraybuffer);

      rendition.display();

      if (book.progress) {
        // @ts-ignore
        rendition.display(book.progress.start.cfi);
      }

      setRendition(rendition);
    },
    [book, setRendition]
  );

  return {
    next,
    previous,
    view,
  };
}