import Homepage from "../pages/Homepage.jsx";
import Error from "../pages/Error.jsx";
import List from "../pages/List.jsx";
import { createBrowserRouter } from "react-router-dom";
import Detail from "../pages/Detail.jsx";
import DetailProduct from "../pages/DetailProduct.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
  },
  {
    path: "list",
    element: <List />,
  },
  {
    path: "list/:id",
    element: <DetailProduct />,
  },
  {
    path: "payment/:product/:user",
    element: <Detail />,
  },
]);
