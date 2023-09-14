"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useReader } from "./use-reader";
import { Navigation } from "./components/navigation";
import { TableOfContent } from "./components/table-of-content";
import { useDarkTheme } from "./use-dark-theme";

export function Reader() {
  const viewAreaRef = useRef(null);

  const reader = useReader();

  useDarkTheme();

  useEffect(() => {
    reader.view(viewAreaRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navigation />
      <TableOfContent />
      <div ref={viewAreaRef} style={{ height: "100vh" }} />
    </Box>
  );
}
