"use client";

import { Button } from "@chakra-ui/react";
import { useBook, useScreen } from "@/app/hooks/use-shell";

import { useEffect, useRef } from "react";

import { blobToArrayBuffer } from "@/app/utils";
import { viewBook } from "@/app/lib/epub";

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
      <h1>Reading</h1>
      <Button onClick={() => setScreen("landing")}>close</Button>
      <div ref={renderAreaRef} style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}
