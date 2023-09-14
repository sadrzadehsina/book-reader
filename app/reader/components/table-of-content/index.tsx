"use client";

import { useBookValue } from "@/app/hooks/use-book";
import { useRenditionValue } from "@/app/hooks/use-rendition";
import { useMemo } from "react";
import { Drawer } from "../drawer";
import { useDrawer } from "../drawer/use-drawer";
import { TableOfContentItem } from "./item";

export function TableOfContent() {
  const book = useBookValue();

  const rendition = useRenditionValue();

  const [open, setOpen] = useDrawer();

  const tableOfContent = useMemo(() => {
    if (!book) return [];

    return book.tableOfContent;
  }, [book]);

  const goToChapter = (href: string) => {
    rendition.display(href);
  };

  return (
    <Drawer
      header="Table Of Content"
      isOpen={open}
      size="sm"
      onClose={() => setOpen(false)}
    >
      {tableOfContent.map((item) => (
        <TableOfContentItem key={item.id} {...item} onClick={goToChapter} />
      ))}
    </Drawer>
  );
}
