import React from "react";
import { Hourglass } from "react-loader-spinner";

function Loading({ height = 60, width = 60 }) {
  return (
    <Hourglass
      visible={true}
      height={height}
      width={width}
      ariaLabel="hourglass-loading"
      colors={["#007F6E", "#007F6E"]}
    />
  );
}

export default Loading;
