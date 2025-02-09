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
import CarList from "../pages/user/CarList";
import CarDetails from "../pages/shared/CarDetails";
import BookingList from "../pages/user/BookingList";
import FavoriteList from "../pages/user/FavoriteList";
import PasswordReset from "../pages/shared/PasswordReset";
import Checkout from "../pages/user/Checkout";

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
        path: "reset-password/:token",
        element: <PasswordReset role="user"/>
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile role="user" />,
          },
          {
            path: "cars",
            element: <CarList />
          },
          {
            path: "cars/:id",
            element: <CarDetails role = "user"/>
          },
          {
            path: "bookings",
            element: <BookingList />
          },
          {
            path: "wishlist",
            element: <FavoriteList />
          },
          {
            path: "checkout/:carId/:isFavorite",
            element: <Checkout />
          }
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
        path: "reset-password/:token",
        element: <PasswordReset role="admin"/>
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
          {
            path: "cars/:id",
            element: <CarDetails role = "admin"/>
          }
        ],
      },
    ],
  },
]);

export default router;
