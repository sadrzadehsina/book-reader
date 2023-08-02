export function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    file.arrayBuffer().then((arrayBuffer) => {
      const blob = new Blob([new Uint8Array(arrayBuffer)], {
        type: file.type,
      });
      resolve(blob);
    });
  });
}
