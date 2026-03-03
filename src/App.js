// src/App.js
import React from "react";
import "./style.css"; // Global resets
import "./App.css";   // Layout styles
import Login from "./Login";

function App() {
  return (
    <div className="main-app-wrapper">
      <Login />
    </div>
  );
}

export default App;