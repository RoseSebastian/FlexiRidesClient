import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="login-popup">
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
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                    <button className="primary loginButton" type="submit">Login</button>
                </form>
                <div className="login-options">
                    <span>Don't have an account? </span>
                    <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;