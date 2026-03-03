// src/App.js
import React, { useState } from "react"; // Added useState
import "./style.css"; 
import "./App.css";   
import Login from "./Login";
import StudentPortal from './StudentPortal';

// This is a sample student to test the portal features
const TEST_STUDENT = {
  name: "Mayumi",
  role: "student",
  subjects: [
    { name: "Object Oriented Programming", units: 3, grade: 1.25 },
    { name: "Data Structures", units: 3, grade: 1.50 },
    { name: "Web Development", units: 3, grade: 1.25 },
    { name: "Discrete Math", units: 3, grade: 2.00 }
  ]
};

function App() {
  // 'user' is null by default. When logged in, it will hold the student's data.
  const [user, setUser] = useState(null);

  // This function is passed to the Login component
  const handleLoginSuccess = (email) => {
    console.log("Logged in as:", email);
    // For now, we set the user to our TEST_STUDENT data
    setUser(TEST_STUDENT);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="main-app-wrapper">
      {!user ? (
        // If no user is logged in, show the Login page
        <Login onLogin={handleLoginSuccess} />
      ) : (
        // Once logged in, show the Student Portal and pass the data
        <div className="portal-wrapper">
           <button className="logout-btn" onClick={handleLogout}>Logout</button>
           <StudentPortal studentData={user} />
        </div>
      )}
    </div>
  );
}

export default App;