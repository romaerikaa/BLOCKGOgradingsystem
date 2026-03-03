// src/Login.jsx
<<<<<<< HEAD
import React, { useState } from 'react'; // Added useState
import './App.css';
import plvbg from './plvbg.jpg';
import plvlogo from './plvlogo.png';

const Login = ({ onLogin }) => { // Accept onLogin prop from App.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real system, you'd verify the password here.
    // For now, it tells App.js that a user has successfully logged in.
    onLogin(email); 
  };

=======
import React from 'react';
import './App.css';
import plvbg from './plvbg.jpg';
import plvlogo from './plvlogo.png'; // Import the logo from src

const Login = () => {
>>>>>>> 5a1e350bca3161df0ae8cbdb089b44ab4d1dd284
  return (
    <div className="login-container">
      <div 
        className="login-image-section" 
        style={{ backgroundImage: `url(${plvbg})` }}
      >
<<<<<<< HEAD
        
=======

>>>>>>> 5a1e350bca3161df0ae8cbdb089b44ab4d1dd284
      </div>

      <div className="login-form-section">
        <div className="login-card">
<<<<<<< HEAD
          <img src={plvlogo} alt="PLV Logo" className="plv-logo" />
          
          <h2 className="welcome-text">Welcome</h2>
          
          {/* Added onSubmit handler */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="username@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required 
              />
=======
          {/* Use the imported variable here */}
          <img src={plvlogo} alt="PLV Logo" className="plv-logo" />
          
          <h2 className="welcome-text">Welcome hello</h2>
          
          <form className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="username@gmail.com" required />
>>>>>>> 5a1e350bca3161df0ae8cbdb089b44ab4d1dd284
            </div>
            
            <div className="input-group">
              <label>Password</label>
<<<<<<< HEAD
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required 
              />
=======
              <input type="password" placeholder="Password" required />
>>>>>>> 5a1e350bca3161df0ae8cbdb089b44ab4d1dd284
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