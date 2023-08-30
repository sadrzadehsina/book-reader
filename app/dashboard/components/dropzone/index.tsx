import { DropzoneOptions } from "react-dropzone";
import { useDropzone } from "./use-dropzone";
import { Box, Text } from "@chakra-ui/react";

export function Dropzone(props: DropzoneOptions) {
  const { getRootProps, getInputProps } = useDropzone(props);

  return (
    <Box
      p="12"
      border="4px"
      borderBottom="8px"
      borderRadius="lg"
      borderColor="#27233A"
      backgroundColor="#5b4eea"
      color="#F3E0EC"
      cursor="pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text fontSize="2xl" align="center">
        Drop books here or click to upload
      </Text>
      <Text fontSize="md" align="center">
        extension support: ePub
      </Text>
      <Text fontSize="md" align="center">
        maximum file size: 10 MB
      </Text>
    </Box>
  );
}
