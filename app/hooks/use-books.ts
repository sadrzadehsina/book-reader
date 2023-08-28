import { useAtomValue, useSetAtom } from "jotai";
import { booksAtom } from "@/app/atoms/books";

export const useBooksValue = () => useAtomValue(booksAtom);
export const useSetBooks = () => useSetAtom(booksAtom);
