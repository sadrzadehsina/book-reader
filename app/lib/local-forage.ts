"use client";

import localforage from "localforage";

localforage.config({
  storeName: "books",
  name: "books-db",
  version: 1.0,
});

export { localforage };
