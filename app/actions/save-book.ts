"use server";

import { PrismaClient } from "@prisma/client";
import { Book } from "../types/book";

const prisma = new PrismaClient();

export async function saveBook(book: Book) {
  return new Promise((resolve, reject) => {
    prisma.book
      .create({
        data: {
          title: book.title,
          author: book.author,
          cover: book.cover,
          progress: JSON.stringify(book.progress),
          file: book.file,
        },
      })
      .then(resolve)
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
}
