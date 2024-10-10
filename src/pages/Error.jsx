import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen text-2xl">
      <img src="/not-found.png" alt="not found" width={180} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

export default Error;
