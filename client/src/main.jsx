import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx"
import "./index.css"
import { Location, locationLoader } from "./Location/Location.jsx";

const router = createBrowserRouter([
  {
    loader: locationLoader,
    path: "/:locationId",
    element: <Location />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
)
