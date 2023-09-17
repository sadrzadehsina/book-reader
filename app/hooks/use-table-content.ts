import { useAtomValue, useSetAtom } from "jotai";
import { bookAtom } from "@/app/atoms/book";
import { tableOfContentAtom } from "../atoms/table-of-content";

export const useTableOfContentValue = () => useAtomValue(tableOfContentAtom);
export const useSetTableOfContent = () => useSetAtom(tableOfContentAtom);
