"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useReader } from "./use-reader";

export function Reader() {
  const viewAreaRef = useRef(null);

  const reader = useReader();

  useEffect(() => {
    reader.view(viewAreaRef.current!);
  }, []);

  return (
    <Box pt="4" pb="4">
      <div ref={viewAreaRef} style={{ height: '100vh'}} />
    </Box>
  );
}
