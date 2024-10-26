import React from "react";
import SkeletonComponent from "react-loading-skeleton";

function Skeleton({ count = 1, width = undefined, height = undefined }) {
  return (
      <SkeletonComponent count={count} width={width} height={height} className="animate-opacity-open" />
  );
}

export default Skeleton;
