import React from "react";
import { ClipLoader } from "react-spinners";

function Loading({ isLoading = true, size = 35, color = '#007F6E'}) {
  return (
    <ClipLoader
      loading={isLoading}
      size={size}
      className="animate-opacity-close"
      color={color}
    />
  );
}

export default Loading;
