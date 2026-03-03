// src/Login.jsx
import React from 'react';
import './App.css';
import plvbg from './plvbg.jpg';
import plvlogo from './plvlogo.png'; // Import the logo from src

const Login = () => {
  return (
    <div className="login-container">
      <div 
        className="login-image-section" 
        style={{ backgroundImage: `url(${plvbg})` }}
      >

      </div>

      <div className="login-form-section">
        <div className="login-card">
          {/* Use the imported variable here */}
          <img src={plvlogo} alt="PLV Logo" className="plv-logo" />
          
          <h2 className="welcome-text">Welcome hello</h2>
          
          <form className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="username@gmail.com" required />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Password" required />
            </div>

            <button type="submit" className="sign-in-btn">Sign In</button>
          </form>

          <p className="forgot-password">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;