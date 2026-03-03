// src/Login.jsx
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

  return (
    <div className="login-container">
      <div 
        className="login-image-section" 
        style={{ backgroundImage: `url(${plvbg})` }}
      >
        
      </div>

      <div className="login-form-section">
        <div className="login-card">
          <img src={plvlogo} alt="PLV Logo" className="plv-logo" />
          

          <h2 className="welcome-text">Welcome 12345</h2>
          
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
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required 
              />
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
