import { useAtomValue, useSetAtom } from "jotai";
import { bookAtom } from "../atoms/book";

export const useBookValue = () => useAtomValue(bookAtom);
export const useSetBook = () => useSetAtom(bookAtom);
