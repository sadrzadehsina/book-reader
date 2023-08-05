"use client";

import { Box, Button, Center, HStack, StackItem } from "@chakra-ui/react";
import { useReader, useScreen } from "@/app/hooks/use-shell";

import { useEffect, useRef } from "react";

import { TableOfContent } from "../table-of-content";
import { Header } from "../header/header";

export function Reading() {
  const renderAreaRef = useRef(null);

  const [_, setScreen] = useScreen();

  const { next, previous, view } = useReader();

  useEffect(() => {
    view(renderAreaRef.current);
  }, [view]);

  return (
    <>
      <Header>
        <StackItem>
          <Button
            backgroundColor="gray.200"
            _hover={{
              backgroundColor: "gray.50",
            }}
            onClick={() => setScreen("landing")}
          >
            close
          </Button>
        </StackItem>
        <StackItem>
          <TableOfContent />
        </StackItem>
        <StackItem>
          <Button
            backgroundColor="gray.200"
            _hover={{
              backgroundColor: "gray.50",
            }}
            onClick={next}
          >
            next chapter
          </Button>
        </StackItem>
        <StackItem>
          <Button
            backgroundColor="gray.200"
            _hover={{
              backgroundColor: "gray.50",
            }}
            onClick={previous}
          >
            previous chapter
          </Button>
        </StackItem>
      </Header>
      <Box pt="4" pb="4" backgroundColor="#111111">
        <div
          ref={renderAreaRef}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      </Box>
    </>
  );
}
