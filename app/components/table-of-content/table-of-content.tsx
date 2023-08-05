"use client";

import { Button } from "@chakra-ui/button";
import { useBook } from "@/app/hooks/use-shell";
import { useMemo } from "react";
import { Drawer, useDrawer } from "../drawer";
import { TableOfContentItem } from "./item";

export function TableOfContent() {
  const book = useBook();

  const [open, setOpen] = useDrawer();

  const tableOfContent = useMemo(() => {
    if (!book) return [];

    return book.tableOfContent;
  }, [book]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>open table of content</Button>
      <Drawer
        header="Table Of Content"
        isOpen={open}
        size="sm"
        onClose={() => setOpen(false)}
      >
        {tableOfContent.map((item) => (
          <TableOfContentItem key={item.id} {...item} />
        ))}
      </Drawer>
    </>
  );
}
