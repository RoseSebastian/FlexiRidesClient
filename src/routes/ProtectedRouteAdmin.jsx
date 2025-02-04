import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const isAdminAuth = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuth) {
      navigate("/admin");
      return;
    }
  }, [isAdminAuth]);

  return isAdminAuth && <Outlet />;
};
