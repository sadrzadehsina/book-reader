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
} from "react-icons/lia";
import { useReader } from "../../use-reader";
import { useSetScreen } from "@/app/hooks/use-screen";
import { useCallback } from "react";

export function Navigation() {
  const { previous, next, openTableOfContent } = useReader();

  const setScreen = useSetScreen();

  const closeBook = useCallback(() => {
    setScreen("dashboard");
  }, []);

  return (
    <>
      <ButtonGroup pos="absolute" top="5" right="5" zIndex="9">
        <VStack>
          <CloseButton onClick={closeBook} />
          <IconButton
            fontSize="24px"
            aria-label="table-of-content"
            variant="ghost"
            icon={<LiaBarsSolid />}
            onClick={() => openTableOfContent(true)}
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
        />
        <IconButton
          fontSize="24px"
          aria-label="next"
          icon={<LiaAngleRightSolid />}
          onClick={next}
        />
      </ButtonGroup>
    </>
  );
}
