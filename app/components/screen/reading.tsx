"use client";

import { Box, Button, HStack, StackItem } from "@chakra-ui/react";
import { useReader, useScreen } from "@/app/hooks/use-shell";

import { useEffect, useRef } from "react";

import { TableOfContent } from "../table-of-content";

export function Reading() {
  const renderAreaRef = useRef(null);

  const [_, setScreen] = useScreen();

  const { next, previous, view } = useReader();

  useEffect(() => {
    view(renderAreaRef.current);
  }, [view]);

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
            <StackItem>
              <Button onClick={next}>next chapter</Button>
            </StackItem>
            <StackItem>
              <Button onClick={previous}>previous chapter</Button>
            </StackItem>
          </HStack>
        </Box>
      </header>
      <div ref={renderAreaRef} style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}
