"use client";

// import "fake-indexeddb/auto";
import localforage from "localforage";

localforage.config({
  storeName: "books",
  // driver: localforage.INDEXEDDB,
  name: "books-db",
  version: 1.0,
});

export { localforage };
