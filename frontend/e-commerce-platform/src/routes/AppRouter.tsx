import { lazy } from "react";

import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import ErrorPage from "../pages/ErrorPage";

const Home = lazy(() => import("../pages/Home"));

const Login = lazy(() => import("../pages/Login"));

const Register = lazy(() => import("../pages/Register"));

const ProductsPage = lazy(() => import("../pages/ProductsPage"));

const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));

export const router = createBrowserRouter([
  {
    path: "/",

    element: <RootLayout />,

    errorElement: <ErrorPage />,

    children: [
      {
        index: true,

        element: <Home />,
      },

      {
        path: "login",

        element: <Login />,
      },

      {
        path: "register",

        element: <Register />,
      },

      {
        path: "products",

        element: <ProductsPage />,
      },

      {
        path: "products/:id",

        element: <ProductDetailsPage />,
      },
    ],
  },
]);
