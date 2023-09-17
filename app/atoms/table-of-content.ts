import { atom } from "jotai";
import { NavItem } from "epubjs";

const tableOfContentAtom = atom<NavItem[]>([]);

export { tableOfContentAtom };
