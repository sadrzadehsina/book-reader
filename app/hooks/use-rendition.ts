import { useAtomValue, useSetAtom } from "jotai";
import { renditionAtom } from "@/app/atoms/rendition";

export const useRenditionValue = () => useAtomValue(renditionAtom);
export const useSetRendition = () => useSetAtom(renditionAtom);
