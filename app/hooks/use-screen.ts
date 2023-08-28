import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom } from "@/app/atoms/screen";

export const useScreenValue = () => useAtomValue(screenAtom);
export const useSetScreen = () => useSetAtom(screenAtom);
