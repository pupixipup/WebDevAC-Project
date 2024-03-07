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
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Navbar from "./components/Navbar.jsx";

const Layout = ({children}) => (
  <>
  <Navbar />
  {children}
  </>
);

const router = createBrowserRouter([
  {
    loader: locationLoader,
    path: "/:locationId",
    element: <Layout><Location /></Layout>,
  },
  {
    path: "/",
    element: <Layout><App /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  { path: "/signup",
    element: <Layout><Signup /></Layout>,
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
)
