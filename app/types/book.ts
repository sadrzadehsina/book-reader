import { type NavItem } from "epubjs";
import { DisplayedLocation } from "epubjs/types/rendition";

export type Book = {
  id: string;
  author: string;
  title: string;
  cover: string;
  progress: DisplayedLocation;
  file: string;
};
