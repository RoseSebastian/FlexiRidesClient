import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };
  const handleForgotPassword = (e) => {
    //setForgotPassword(false);
  };
  return (
    <div className="login-popup">
      {forgotPassword === false ? (
        <div className="login-popup-content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="link"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password?
              </span>
            </div>
            <button className="primary loginButton" type="submit">
              Login
            </button>
          </form>
          <div className="login-options">
            <span>Don't have an account? </span>
            <a href="/signup">Sign Up</a>
          </div>
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
