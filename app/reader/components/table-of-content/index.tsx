"use client";

import { Button } from "@chakra-ui/button";
import { useBookValue } from "@/app/hooks/use-book";
import { useRenditionValue } from "@/app/hooks/use-rendition";
import { useMemo } from "react";
import { Drawer } from "../drawer";
import { useDrawer } from "../drawer/use-drawer";
import { TableOfContentItem } from "./item";
import { useDatabase } from "@/app/context/database";

export function TableOfContent() {
  const book = useBookValue();

  const rendition = useRenditionValue();

  const { updateProgress } = useDatabase();

  const [open, setOpen] = useDrawer();

  const tableOfContent = useMemo(() => {
    if (!book) return [];

    return book.tableOfContent;
  }, [book]);

  const goToChapter = (href: string) => {
    rendition.display(href).then(() => {
      updateProgress(book.id, rendition.currentLocation());
    });
  };

  return (
    <>
      <Button
        backgroundColor="gray.200"
        _hover={{
          backgroundColor: "gray.50",
        }}
        onClick={() => setOpen(true)}
      >
        open table of content
      </Button>
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
    </>
  );
}
