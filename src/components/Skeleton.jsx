import React from "react";
import SkeletonComponent from "react-loading-skeleton";

function Skeleton({ count = 1, width = undefined, height = undefined, className = '', cirle = false }) {
  return (
      <SkeletonComponent count={count} width={width} height={height} className={`animate-opacity-open ${className}`} circle={cirle} />
  );
}

export default Skeleton;
