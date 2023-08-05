import { type NavItem } from "epubjs";

export type Book = {
  title: string;
  cover: string;
  tableOfContent: Array<NavItem>;
  blob: Blob;
};
