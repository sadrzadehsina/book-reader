'use client';

import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'

import { useDrawer } from './hooks/use-drawer'

export function PageLayout({ children }: { children: React.ReactNode }) {

  const [open, setOpen] = useDrawer();

  return (
    <Box>
      <Drawer isOpen={open} placement='right' colorScheme='teal' onClose={() => setOpen(false)} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Drawer Header
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some conte</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  )

}