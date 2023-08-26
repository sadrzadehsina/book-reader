import { Rendition } from "epubjs";
import { atom } from "jotai";

const renditionAtom = atom<Rendition>(null as unknown as Rendition);

export { renditionAtom };
