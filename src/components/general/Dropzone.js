import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@material-ui/core";

function DropZone({ onChange }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Box
        p={6}
        style={{
          background: "#88BA71",
          borderRadius: "0.5rem",
          textAlign: "center",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <Typography variant="body1">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag file to upload or click here to find file"}
        </Typography>
      </Box>
    </div>
  );
}

export default DropZone;
