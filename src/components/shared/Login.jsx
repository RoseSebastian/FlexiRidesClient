import React, { useState } from "react";
import "../../styles/shared/Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/feature/userSlice";
import { saveAdminData } from "../../redux/feature/adminSlice";

const Login = ({ setIsLogin, role = "user" }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    login_api: "/user/login",
    signup_url: "/signup",
  };

  if (role === "admin") {
    user.role = "admin";
    user.login_api = "/admin/login";
    user.signup_url = "/admin/signup";
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...loginData,
      [name]: value,
    };
    setLoginData(updatedData);
    const isFormValid = Object.values(updatedData).every((field) => {
      return field !== "";
    });
    setIsFormValid(isFormValid);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
    navigate(user.signup_url);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.login_api,
        data: loginData,
      });
      const loggedInUser = response.data.data;
      localStorage.setItem("userData", JSON.stringify(loggedInUser));
      user.role === "user" ? dispatch(saveUserData(loggedInUser)) : dispatch(saveAdminData(loggedInUser));
      toast.success(`${response.data.message}`);
      setIsLogin(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleForgotPassword = (e) => {
    setForgotPassword(false);
    setIsLogin(false);
  };
  return (
    <div className="login-popup">
      {forgotPassword === false ? (
        <div className="login-popup-content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>
                Email:<span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Password:<span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <span className="link" onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </span>
            </div>
            <button
              className="primary loginButton"
              type="submit"
              disabled={!isFormValid}
            >
              Login
            </button>
          </form>
          {user.role === "user" ? (
            <div className="login-options">
              <span>Don't have an account? </span>
              <span className="link" onClick={handleSignupClick}>
                Sign Up
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="forgotPassword">
          <h2>Reset your Password</h2>
          <p>
            To reset your password, enter your email below and submit. An email
            will be sent to you with instructions about how to complete the
            process.
          </p>
          <input type="email" placeholder="Enter your email" />
          <button className="primary restButton" onClick={handleForgotPassword}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
