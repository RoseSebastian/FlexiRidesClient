import React from "react";
import "../../styles/shared/Footer.css";
import logo from "../../assets/logo_flexiRides.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = (props) => {
  const user = {
    userAuth: useSelector((state) => state.user.isUserAuth),
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin");
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="logo" />
        <div>&copy; 2023 FlexiRides. All rights reserved.</div>
        {(!props.isAdmin && !user.userAuth) && (
          <div className="adminNav" onClick={handleClick}>
            Login as admin
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
