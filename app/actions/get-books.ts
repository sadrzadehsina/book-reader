"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBooks() {
  return new Promise((resolve, reject) => {
    prisma.book.findMany().then(resolve).catch(reject);
  });
}
