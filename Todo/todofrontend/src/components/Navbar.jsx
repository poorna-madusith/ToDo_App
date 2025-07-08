import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, onProfile }) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    if (onProfile) {
      onProfile();
    } else {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout logic (clear localStorage and redirect to login)
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>ToDo App</div>
      <div className="navbar-actions">
        <button onClick={handleProfile} className="navbar-btn">Profile</button>
        <button onClick={handleLogout} className="navbar-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
