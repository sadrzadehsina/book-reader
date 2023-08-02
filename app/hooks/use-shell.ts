import { atom, useAtom } from "jotai";

const screenAtom = atom<"uploading" | "reading">("uploading");

export function useShell() {
  const [screen, setScreen] = useAtom(screenAtom);

  return {
    screen,
    setScreen,
  };
}
