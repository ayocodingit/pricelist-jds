import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col text-center gap-2 items-center justify-center h-[calc(100dvh)] text-lg">
      <img src="/not-found.png" alt="not found" width={180} />
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

export default Error;
