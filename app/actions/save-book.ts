"use server";

import { PrismaClient } from "@prisma/client";
import { Book } from "../types/book";

const prisma = new PrismaClient();

export async function saveBook(book: Book) {
  return new Promise((resolve, reject) => {});
}
