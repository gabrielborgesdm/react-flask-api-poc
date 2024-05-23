import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Books from 'pages/Books/Books';
import './index.css';
import { Navbar } from 'components/Navbar/Navbar';
import Authors from 'pages/Authors/Authors';
import Layout from 'components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout element={<Books />} />,
  },
  {
    path: "/authors",
    element: <Layout element={<Authors />} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

