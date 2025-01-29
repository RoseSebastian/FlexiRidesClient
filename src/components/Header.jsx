import React, {useState} from "react";
import "../styles/Header.css";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

export function Header(props) {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

  const handleSignupClick = () => {
    setIsLogin(false);
    navigate("/signup");
  };
  const handleHomeClick = () => {
    setIsLogin(false);
    navigate("/");
  };
  return (
    <>
      <header className="header">
        <div className="appName" onClick={handleHomeClick}>FlexiRides</div>
        <div className="auth-buttons">
          <button className="secondary" onClick={() => setIsLogin(!isLogin)}>Login</button>
          <button className="primary" onClick={handleSignupClick}>Signup</button>
        </div>
      </header>
        {isLogin && <Login setIsLogin={setIsLogin}/>}
    </>
  );
}
