import Homepage from "../pages/Homepage.jsx";
import Error from "../pages/Error.jsx";
import List from "../pages/List.jsx";
import { createBrowserRouter } from "react-router-dom";
import DetailProduct from "../pages/DetailProduct.jsx";
import Cart from "../pages/Cart.jsx";
import Payment from "../pages/Payment.jsx";

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
    path: "cart",
    element: <Cart />,
  },
  {
    path: "list/:id",
    element: <DetailProduct />,
  },
  {
    path: "payment/:product/:user/:qty",
    element: <Payment />,
  },
]);
