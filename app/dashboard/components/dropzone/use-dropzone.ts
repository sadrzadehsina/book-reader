"use client";

import {
  DropzoneOptions,
  useDropzone as useDropzoneBase,
} from "react-dropzone";

export function useDropzone({ onDrop }: DropzoneOptions) {
  const { getRootProps, getInputProps } = useDropzoneBase({
    onDrop,
    maxFiles: 1,
  });

  return {
    getRootProps,
    getInputProps,
  };
}
