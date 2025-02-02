import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const isUserAuth  = useSelector((state) => state.user.isUserAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuth) {
            navigate("/");
            return;
        }
    },[isUserAuth]);   

    return isUserAuth && <Outlet />;
};