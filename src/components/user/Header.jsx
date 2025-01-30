import React, { useState } from "react";
import "../../styles/shared/Header.css";
import Login from "../shared/Login";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import profileIcon from "../../assets/profile-icon.png";
import Dropdown from "react-bootstrap/Dropdown";
import ThemeToggle from "../../components/shared/ThemeToggle"
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/feature/userSlice";

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    userData: useSelector((state) => state.user.userData),
    userAuth: useSelector((state) => state.user.isUserAuth),
  };

  const handleSignupClick = () => {
    setIsLogin(false);
    navigate("/signup");
  };

  const handleHomeClick = () => {
    setIsLogin(false);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/logout"
      });
      localStorage.removeItem("userData")
      dispatch(clearUserData());
      console.log(response)
      toast.success(`${response.data.message}`);
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <header className="header">
        <div className="appName" onClick={handleHomeClick}>
          FlexiRides
        </div>
        {user.userAuth ? (
          <div className="userLinks">
            <Link to="/bookings">My Bookings</Link>
            <Link to="/wishlist">Favorites</Link>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Image
                  src={user.userData.profilePic ?? profileIcon}
                  roundedCircle
                  fluid
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ThemeToggle />
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="secondary" onClick={() => setIsLogin(!isLogin)}>
              Login
            </button>
            <button className="primary" onClick={handleSignupClick}>
              Signup
            </button>
          </div>
        )}
      </header>
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </>
  );
}
