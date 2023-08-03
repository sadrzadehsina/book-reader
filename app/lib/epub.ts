"use client";

import JSZip from "jszip";
import ePub from "epubjs";

type BookMeta = {
  title: string;
};

export function viewBook(area: HTMLElement, file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    // file.arrayBuffer().then((arrayBuffer) => {
    const book = ePub(
      "https://github.com/IDPF/epub3-samples/releases/download/20230704/accessible_epub_3.epub"
    );
    const rendition = book.renderTo(area, {
      flow: "scrolled-doc",
      width: "700px",
      height: "700px",
    });
    const displayed = rendition.display();

    displayed.then(resolve);
    // });
  });
}

export function parseBook(file: File): Promise<BookMeta> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);
    book.loaded.metadata.then((metadata) => {
      resolve({
        title: metadata.title,
      });
    });
  });
}


export function extractBookMeta(file: File): Promise<BookMeta> {
  return new Promise((resolve, reject) => {
    const book = ePub(file as unknown as ArrayBuffer);
    book.loaded.metadata.then((metadata) => {
      resolve({
        title: metadata.title,
      });
    });
  });
}


