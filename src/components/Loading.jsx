import React from "react";
import { ClipLoader } from "react-spinners";

function Loading({ isLoading = true, size = 35, color = 'var(--primary-color)'}) {
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
