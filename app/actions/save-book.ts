"use server";

import { Dropbox } from "dropbox";

import { PrismaClient } from "@prisma/client";
import { Book } from "../types/book";

const prisma = new PrismaClient();

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

export async function saveBook(book: Book) {
  // @ts-ignore
  const fileContent = await book.file.get('file').arrayBuffer();
  console.log(fileContent);
  return new Promise((resolve, reject) => {
    dbx
      .filesUpload({
        path: `/${book.title.toLowerCase().split(" ").join("-")}.epub`,
        contents: fileContent,
      })
      .then((response) => {
        prisma.book
          .create({
            data: {
              title: book.title,
              author: book.author,
              cover: book.cover,
              tableOfContent: JSON.stringify(book.tableOfContent),
              progress: JSON.stringify(book.progress),
              file: response.result.id,
            },
          })
          .then(resolve)
          .catch((error) => {
            console.log(error);
            reject();
          });
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
}
