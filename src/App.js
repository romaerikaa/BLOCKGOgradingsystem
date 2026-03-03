<<<<<<< HEAD
import React, { useState } from "react";
import "./style.css"; 
import "./App.css";   
import Login from "./Login";
import StudentPortal from './StudentPortal';

// Updated Mock Data to match your new Table & GWA logic
const TEST_STUDENT = {
  name: "Mayumi",
  role: "student",
  subjects: [
    { code: "IT-221", name: "Object Oriented Programming", units: 3, midterm: 85, finals: 95 },
    { code: "IT-222", name: "Data Structures", units: 3, midterm: 88, finals: 90 },
    { code: "IT-223", name: "Web Development", units: 3, midterm: 94, finals: 96 },
    { code: "GE-101", name: "Discrete Math", units: 3, midterm: 78, finals: 82 }
    
  ]
};

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (email) => {
    // This connects to the onLogin prop in your Login.jsx
    setUser(TEST_STUDENT);
  };

  const handleLogout = () => {
    // This resets the state and forces React to show the Login screen
    setUser(null);
  };

  return (
    <div className="main-app-wrapper">
      {!user ? (
        <Login onLogin={handleLoginSuccess} />
      ) : (
        /* Notice we removed the extra <div> and button here. 
           We now pass 'handleLogout' directly into the StudentPortal 
           so the button can live inside your Navy Blue Header.
        */
        <StudentPortal studentData={user} onLogout={handleLogout} />
      )}
=======
// src/App.js
import React from "react";
import "./style.css"; // Global resets
import "./App.css";   // Layout styles
import Login from "./Login";

function App() {
  return (
    <div className="main-app-wrapper">
      <Login />
>>>>>>> 5a1e350bca3161df0ae8cbdb089b44ab4d1dd284
    </div>
  );
}

export default App;