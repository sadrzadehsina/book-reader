"use client";

import { Box, Button, HStack, StackItem } from "@chakra-ui/react";
import { useBook, useScreen } from "@/app/hooks/use-shell";

import { useEffect, useRef } from "react";

import { blobToArrayBuffer } from "@/app/utils";
import { viewBook } from "@/app/lib/epub";
import { TableOfContent } from "../table-of-content";

export function Reading() {
  const renderAreaRef = useRef(null);

  const [_, setScreen] = useScreen();

  const selectedBook = useBook();

  useEffect(() => {
    if (!selectedBook) return;
    blobToArrayBuffer(selectedBook.blob).then((arraybuffer) => {
      viewBook(renderAreaRef.current!, arraybuffer);
    });
  }, [selectedBook]);

  return (
    <>
      <header>
        <Box backgroundColor="WindowFrame" p="4" mb="4">
          <HStack>
            <StackItem>
              <Button onClick={() => setScreen("landing")}>close</Button>
            </StackItem>
            <StackItem>
              <TableOfContent />
            </StackItem>
          </HStack>
        </Box>
      </header>
      <div ref={renderAreaRef} style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}
