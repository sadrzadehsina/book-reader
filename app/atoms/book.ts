import { atom } from "jotai";
import { Book } from "@/app/types/book";

const bookAtom = atom<Book>(null as unknown as Book);

export { bookAtom };