import React, { useState, useEffect } from "react";
import "../../styles/shared/Header.css";
import Login from "../shared/Login";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Image from "react-bootstrap/Image";
import profileIcon from "../../assets/profile-icon.png";
import Dropdown from "react-bootstrap/Dropdown";
import ThemeToggle from "../../components/shared/ThemeToggle";
import { clearAdminData, saveAdminData } from "../../redux/feature/adminSlice";
import { axiosInstance } from "../../config/axiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function AdminHeader() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    userData: useSelector((state) => state.admin.adminData),
    userAuth: useSelector((state) => state.admin.isAdminAuth),
  };

  const handleHomeClick = () => {
    setIsLogin(false);
    navigate("/admin");
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/logout",
      });
      
      dispatch(clearAdminData());
      toast.success(`${response.data.message}`);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <header className="header">
        <div className="appName" onClick={handleHomeClick}>
          FlexiRides
        </div>
        {user.userAuth ? (
          <div className="userLinks">
            {user.userData?.role === "admin" ? (
              <>
                <Link to="/admin/bookings">Bookings</Link>
                <Link to="/admin/users">Users</Link>
              </>
            ) : (
              <></>
            )}
            <Link to="/admin/cars">Cars</Link>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Image
                  src={user.userData?.profilePic ?? profileIcon}
                  roundedCircle
                  fluid
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ThemeToggle />
                <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <button className="secondary" onClick={() => setIsLogin(!isLogin)}>
            Login
          </button>
        )}
      </header>
      {isLogin && <Login setIsLogin={setIsLogin} role="admin" />}
    </>
  );
}
