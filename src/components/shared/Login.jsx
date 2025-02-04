import React, { useState } from "react";
import "../../styles/shared/Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/feature/userSlice";
import { saveAdminData } from "../../redux/feature/adminSlice";
import { saveLoadingState } from "../../redux/feature/appSlice";

const Login = ({ setIsLogin, role = "user" }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailLink, setEmail] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    login_api: "/user/login",
    signup_url: "/signup",
    dashboard_url: "/",
    forgot_password_api: "/user/forgotPassword",
  };

  if (role === "admin") {
    user.role = "admin";
    user.login_api = "/admin/login";
    user.signup_url = "/admin/signup";
    user.dashboard_url = "/admin";
    user.forgot_password_api = "/admin/forgotPassword";
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
    dispatch(saveLoadingState(true));

    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.login_api,
        data: loginData,
      });
      const loggedInUser = response.data.data;
      localStorage.setItem("userData", JSON.stringify(loggedInUser));
      user.role === "user"
        ? dispatch(saveUserData(loggedInUser))
        : dispatch(saveAdminData(loggedInUser));
      dispatch(saveLoadingState(false));
      toast.success(`${response.data.message}`);
      setIsLogin(false);
      navigate(user.dashboard_url);
    } catch (error) {
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
    }
  };

  const emailChanged = (e) => {
    setEmail({ email: e.target.value });
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(saveLoadingState(true));
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.forgot_password_api,
        data: emailLink,
      });
      dispatch(saveLoadingState(false));
      toast.success(`${response.data.message}`);
      setForgotPassword(false);
      setIsLogin(false);
    } catch (error) {
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
    }
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
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={emailLink.email}
            onChange={emailChanged}
          />

          <button className="primary restButton" onClick={handleForgotPassword}>
            Sent Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
