import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;