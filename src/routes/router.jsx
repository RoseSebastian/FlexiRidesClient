import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import Signup from "../pages/Signup";
import AdminRoot from "./adminRoot";
import Root from "./root";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
            path: "/signup",
            element: <Signup />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminRoot />
    }
  ]);

  export default router;