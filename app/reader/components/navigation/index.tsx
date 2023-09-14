import {
  Box,
  ButtonGroup,
  CloseButton,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import {
  LiaAngleLeftSolid,
  LiaAngleRightSolid,
  LiaBarsSolid,
  LiaSave,
} from "react-icons/lia";
import { useReader } from "../../use-reader";
import { useSetScreen } from "@/app/hooks/use-screen";
import { useCallback } from "react";
import { useRenditionValue } from "@/app/hooks/use-rendition";
import { useBookValue } from "@/app/hooks/use-book";

import { useDatabase } from "@/app/context/database";

import type { DisplayedLocation } from "epubjs/types/rendition";

export function Navigation() {
  const { previous, next, openTableOfContent } = useReader();

  const { updateProgress } = useDatabase();

  const rendition = useRenditionValue();

  const book = useBookValue();

  const setScreen = useSetScreen();

  const closeBook = useCallback(() => {
    setScreen("dashboard");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProgress = useCallback(() => {
    const location: DisplayedLocation = rendition.currentLocation();
    updateProgress(book.id, location);
  }, [book.id, rendition, updateProgress]);

  return (
    <>
      <ButtonGroup pos="absolute" top="5" right="5" zIndex="9">
        <VStack>
          <CloseButton
            onClick={closeBook}
            color="white"
            _hover={{ backgroundColor: "#000" }}
          />
          <IconButton
            fontSize="24px"
            aria-label="table-of-content"
            variant="ghost"
            color="white"
            icon={<LiaBarsSolid />}
            onClick={() => openTableOfContent(true)}
            _hover={{ backgroundColor: "#000" }}
          />
          <IconButton
            fontSize="24px"
            aria-label="save"
            variant="ghost"
            color="white"
            icon={<LiaSave />}
            onClick={saveProgress}
            _hover={{ backgroundColor: "#000" }}
          />
        </VStack>
      </ButtonGroup>
      <ButtonGroup
        pos="absolute"
        bottom="10"
        right="50%"
        marginRight="-40px"
        zIndex="9"
      >
        <IconButton
          fontSize="24px"
          aria-label="previous"
          icon={<LiaAngleLeftSolid />}
          onClick={previous}
          variant="ghost"
          color="white"
          _hover={{ backgroundColor: "#000" }}
        />
        <IconButton
          fontSize="24px"
          aria-label="next"
          icon={<LiaAngleRightSolid />}
          onClick={next}
          variant="ghost"
          color="white"
          _hover={{ backgroundColor: "#000" }}
        />
      </ButtonGroup>
    </>
  );
}
