import React from 'react';
import '../styles/Footer.css'; 
import logo from "../assets/logo_flexiRides.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={logo} alt="logo" />
                <p>&copy; 2023 FlexiRides. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;