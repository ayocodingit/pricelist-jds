import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="hover:cursor-pointer border border-dashed relative h-40 flex items-center p-2 text-primary border-primary w-full justify-center"
    >
      <input
        {...getInputProps()}
        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
        accept="image/png, image/jpeg, image/svg, image/webp"
      />
      {isDragActive ? (
        <p> Drag and drop to upload </p>
      ) : (
        <p>Pilih File or Drag and Drop</p>
      )}
    </div>
  );
}

export default Dropzone;
