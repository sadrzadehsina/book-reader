"use server";

import { Dropbox } from "dropbox";
import fs from "fs";
import path from "path";

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

export async function getBook(bookId: string) {
  return new Promise((resolve, reject) => {
    dbx
      .filesDownload({ path: bookId })
      .then((response) => {
        fs.writeFile(
          path.join("public", response.result.name),
          // @ts-ignore
          response.result.fileBinary,
          { encoding: "binary" },
          (err) => {
            if (err) {
              throw err;
            }
            resolve(response.result.name);
          }
        );
      })
      .catch(reject);
  });
}
