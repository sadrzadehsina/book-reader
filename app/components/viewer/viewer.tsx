"use client";

import { viewBook } from "@/app/lib/epub";
import { useEffect, useRef } from "react";

export function Viewer({ book }: { book: File }) {
  const bookRef = useRef(null);
  const viewAreaRef = useRef(null);

  useEffect(() => {
    async function display() {
      const displayed = await viewBook(viewAreaRef.current!, book);
      bookRef.current = displayed;
    }

    display();
  }, [book]);

  return (
    <>
      <div ref={viewAreaRef}></div>
      <button onClick={() => bookRef.current.next()}>next</button>
    </>
  );
}
