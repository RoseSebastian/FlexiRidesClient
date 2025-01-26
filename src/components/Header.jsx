import React, {useState} from "react";
import "../styles/Header.css";
import Login from "../components/Login";

export function Header(props) {
    const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <header className="header">
        <div className="appName">FlexiRides</div>
        <div className="auth-buttons">
          <button className="secondary" onClick={() => setIsLogin(!isLogin)}>Login</button>
          <button className="primary">Signup</button>
        </div>
      </header>
        {isLogin && <Login />}
    </>
  );
}
