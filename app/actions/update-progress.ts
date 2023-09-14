"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateProgress(bookId: string, progress: string) {
  return new Promise((resolve, reject) => {
    prisma.book
      .update({
        where: {
          id: bookId,
        },
        data: {
          progress,
        },
      })
      .then(resolve)
      .catch(reject);
  });
}
