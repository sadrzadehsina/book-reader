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

export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      resolve(event.target?.result as unknown as ArrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
