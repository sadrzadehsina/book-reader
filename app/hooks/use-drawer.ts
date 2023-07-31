import { atom, useAtom } from 'jotai'

const openAtom = atom<boolean>(false)

export function useDrawer() {

  const [open, setOpen] = useAtom(openAtom)

  return [open, setOpen] as const;

}

