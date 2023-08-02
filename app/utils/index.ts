export function fileToBlob(file: File) {
  return new Promise((resolve) => {
    file.arrayBuffer().then((arrayBuffer) => {
      const blob = new Blob([new Uint8Array(arrayBuffer)], {
        type: file.type,
      });
      resolve(blob);
    });
  });
}
