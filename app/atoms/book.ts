import { atom } from "jotai";
import { Book } from "../types/book";

const bookAtom = atom<Book>(null as unknown as Book);

export { bookAtom };