import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Books from "pages/Books/Books";
import Authors from "pages/Authors/Authors";
import Layout from "components/Layout";

import AuthorCreate from "pages/Authors/AuthorCreate";
import BookCreate from "pages/Books/BookCreate";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Books />,
      },
      {
        path: "books/create",
        element: <BookCreate />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "authors/create",
        element: <AuthorCreate />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
