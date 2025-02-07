import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from "../components/shared/Footer";
import { AdminHeader } from "../components/admin/AdminHeader"
import { saveAdminData } from "../redux/feature/adminSlice";
import { useDispatch } from "react-redux";
import {axiosInstance} from "../config/axiosInstance";

function AdminLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/currentUser",
      });
      dispatch(saveAdminData(response?.data?.data));
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
  }, [location.pathname]);

  return (
    <>
        <AdminHeader />
        <Outlet />
        <Footer isAdmin = {true}/>
    </>
  )
}

export default AdminLayout