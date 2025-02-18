import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = ({ role = "user" }) => {
    const url = {
        home: "/",
    };

    if (role === "admin") {
        url.home = "/admin";
    }

    const naviagte = useNavigate();

    return (
        <div className="errorContainer">
            <h1>404: Page Not Found!</h1>
            <button className="primary" onClick={() => naviagte(url.home)}>Navigate to home</button>
        </div>
    );
};