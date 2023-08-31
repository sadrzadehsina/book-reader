"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useReader } from "./use-reader";
import { Navigation } from "./components/navigation";

export function Reader() {
  const viewAreaRef = useRef(null);

  const reader = useReader();

  useEffect(() => {
    reader.view(viewAreaRef.current!);
  }, []);

  return (
    <Box pt="4" pb="4">
      <Navigation />
      <div ref={viewAreaRef} style={{ height: '100vh'}} />
    </Box>
  );
}
