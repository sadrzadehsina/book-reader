import { atom } from "jotai";

const screenAtom = atom<"dashboard" | "reader">("dashboard");

export { screenAtom };
