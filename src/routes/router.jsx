import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/shared/LandingPage";
import Signup from "../pages/shared/Signup";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import Bookings from "../pages/admin/Bookings";
import Cars from "../pages/admin/Cars";
import Users from "../pages/admin/Users";
import Profile from "../pages/shared/Profile";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage role="user" />,
    children: [
      {
        path: "",
        element: <LandingPage role="user" />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile role="user" />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
      {
        path: "",
        element: <LandingPage role="admin" />,
      },
      {
        element: <ProtectedRouteAdmin />,
        children: [
          {
            path: "profile",
            element: <Profile role="admin" />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "cars",
            element: <Cars />,
          },
        ],
      },
    ],
  },
]);

export default router;
