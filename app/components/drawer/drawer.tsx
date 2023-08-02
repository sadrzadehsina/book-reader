"use client";

import {
  Drawer as DrawerBase,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps as DrawerPropsBase,
} from "@chakra-ui/react";

interface DrawerProps extends DrawerPropsBase {
  header: string;
}

export function Drawer(props: DrawerProps) {
  return (
    <DrawerBase {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{props.header}</DrawerHeader>
        <DrawerBody>{props.children}</DrawerBody>
      </DrawerContent>
    </DrawerBase>
  );
}
