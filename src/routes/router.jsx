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
import BookingConfirmation from "../pages/user/BookingConfirmation";
import EditUser from "../pages/admin/EditUser";
import AddCar from "../pages/admin/AddCar";
import AddUser from "../pages/admin/AddUser";

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
            path: "wishlist",
            element: <FavoriteList />
          },
          {
            path: "checkout/:carId/:isFavorite",
            element: <Checkout />
          },
          {
            path: "confirmation/:id",
            element: <BookingConfirmation />
          },
          {
            path: "bookings",
            element: <BookingList />,
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
          },
          {
            path: "users/:id/:isMember",
            element: <EditUser/>
          },
          {
            path: "add/car",
            element: <AddCar />
          },
          {
            path: "add/member",
            element: <AddUser  role="user"/>
          },
          {
            path: "add/admin",
            element: <AddUser  role="admin"/>
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
        ],
      },
    ],
  },
]);

export default router;
