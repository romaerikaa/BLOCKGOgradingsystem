import React, { useState } from "react";
import "./App.css";   
import "./login.css";   
import "./StudentPortal.css";
import "./FacultyPortal.css";
import Login from "./Login";
import StudentPortal from './StudentPortal';
import FacultyPortal from './FacultyPortal';

// Mock Data
const TEST_STUDENT = {
  firstName: "Mayumi",
  lastName: "Santos",
  middleName: "Cruz",
  sex: "Female",
  studentId: "23 – 0000",
  dateOfBirth: "January 1, 2000",
  phone: "0900 000 0000",
  email: "mayumisantos@student.edu.ph",
  address: "123 Anywhere Street, Anywhere City",
  role: "student",
  subjects: [
    { code: "IT-221", name: "Object Oriented Programming", units: 3, midterm: 100, finals: 100 },
    { code: "IT-222", name: "Data Structures", units: 3, midterm: 100, finals: 100 },
    { code: "IT-223", name: "Web Development", units: 3, midterm: 100, finals: 100 },
    { code: "GE-101", name: "Discrete Math", units: 3, midterm: 100, finals: 100 }
  ]
};

const TEST_FACULTY = {
  firstName: "Juan",
  lastName: "Dela Cruz",
  middleName: "Rodriguez",
  sex: "Male",
  role: "faculty",
  department: "College of Information Technology",
  status: "Full-Time",
  facultyId: "F-0000",
};

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (email) => {
    // Logic to separate roles based on email domain
    if (email.toLowerCase().includes("faculty")) {
      setUser(TEST_FACULTY);
    } else if (email.toLowerCase().includes("student")) {
      setUser(TEST_STUDENT);
    } else {
      alert("Invalid email domain. Please use @faculty or @student.");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="main-app-wrapper">
      {!user ? (
        <Login onLogin={handleLoginSuccess} />
      ) : (
        /* Conditional Rendering based on the user's role */
        <>
          {user.role === "student" ? (
            <StudentPortal studentData={user} onLogout={handleLogout} />
          ) : (
            <FacultyPortal facultyData={user} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;