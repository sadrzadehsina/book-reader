import { useAtomValue, useSetAtom } from "jotai";
import { bookAtom } from "@/app/atoms/book";

export const useBookValue = () => useAtomValue(bookAtom);
export const useSetBook = () => useSetAtom(bookAtom);
