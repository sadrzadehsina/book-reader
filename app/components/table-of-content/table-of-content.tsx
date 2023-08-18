"use client";

import { Button } from "@chakra-ui/button";
import { useBook, useRenditionValue } from "@/app/hooks/use-shell";
import { useMemo } from "react";
import { Drawer, useDrawer } from "../drawer";
import { TableOfContentItem } from "./item";
import { useDatabase } from "@/app/context/database";

export function TableOfContent() {
  const book = useBook();

  const rendition = useRenditionValue();

  const { updateProgress} = useDatabase();

  const [open, setOpen] = useDrawer();

  const tableOfContent = useMemo(() => {
    if (!book) return [];

    return book.tableOfContent;
  }, [book]);

  const goToChapter = (href: string) => {
    rendition.display(href);
    updateProgress(book.id, href);
  }

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
