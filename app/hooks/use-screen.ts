import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom } from "../atoms/screen";

export const useScreenValue = () => useAtomValue(screenAtom);
export const useSetScreen = () => useSetAtom(screenAtom);
