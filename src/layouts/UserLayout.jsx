import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/user/Header";
import Footer from "../components/shared/Footer";
import { saveUserData } from "../redux/feature/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {axiosInstance} from "../config/axiosInstance";

function UserLayout() {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("isUserAuth====", isUserAuth);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/currentUser",
      });
      dispatch(saveUserData(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
    let isDark = localStorage.getItem("isDark") === "true";
    document
      .querySelector("html")
      .setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer isAdmin={false} />
    </>
  );
}

export default UserLayout;
