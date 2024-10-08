import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <div className="h-screen p-5 font-roboto">
      <RouterProvider router={router} />
    
    </div>
  </StrictMode>
);
