import Homepage from "../pages/Homepage.jsx";
import Error from "../pages/Error.jsx";
import List from "../pages/List.jsx";
import { createBrowserRouter } from "react-router-dom";
import DetailProduct from "../pages/DetailProduct.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import SuccessOrder from "../pages/SuccessOrder.jsx";
import Profile from "../pages/Profile.jsx";

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
    path: "checkout/:username",
    element: <Checkout />,
  },
  {
    path: "success-order",
    element: <SuccessOrder />,
  },
  {
    path: "me",
    element: <Profile />,
  },
]);
