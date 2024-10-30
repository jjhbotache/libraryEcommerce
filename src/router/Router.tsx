import Login from "@/pages/Login";
import ProductList from "@/pages/Products";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      
    ]
  }
  
]);