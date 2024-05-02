import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Verification from "./pages/Verification.tsx";
import Evidence from "./pages/Evidence.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  { path: "/about", element: <div>About</div> },
  { path: "/contact", element: <div>Contact</div> },
  { path: "/profile", element: <div>Profile</div> },
  { path: "/evidence", element: <Evidence /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
