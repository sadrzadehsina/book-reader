import { type NavItem } from "epubjs";

export type Book = {
  id: string;
  title: string;
  cover: string;
  tableOfContent: Array<NavItem>;
  blob: Blob;
  progress: string;
};
