import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Books from 'pages/Books/Books';
import './index.css';
import { Navbar } from 'components/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

