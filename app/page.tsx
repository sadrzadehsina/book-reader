"use client";

import { useCallback } from "react";
import { Dropzone } from "./components/dropzone";

import { useShell } from "./hooks/use-shell";

import { fileToBlob } from "./utils";

import { useDatabase } from "./context/database";
import { parseBook } from "./lib/epub";

export default function Home() {
  const { screen } = useShell();

  const { saveBook } = useDatabase();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    parseBook(acceptedFiles[0]).then(console.log);
    
    const file = acceptedFiles[0];

    const meta = await parseBook(file);
    const blob = await fileToBlob(file);

    await saveBook(meta.title, blob);

    
  }, [saveBook]);

  if (screen === "uploading") return <Dropzone onDrop={onDrop} />;

  return <p>viewing book</p>;
}
