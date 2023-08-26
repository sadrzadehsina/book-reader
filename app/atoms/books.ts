import { atom } from "jotai";
import { Book } from "../types/book";

const booksAtom = atom<Book[]>([]);

export { booksAtom };
