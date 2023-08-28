import { atom } from "jotai";
import { Book } from "@/app/types/book";

const booksAtom = atom<Book[]>([]);

export { booksAtom };
