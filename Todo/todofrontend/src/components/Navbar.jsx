import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onProfile }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const isloginorregister  = location.pathname === "/login" || location.pathname === "/register";

  const handleProfile = () => {
    if (onProfile) {
      onProfile();
    } else {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const todoapp = () => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      window.alert("Please login to acces in tot he app");
    }else{
      navigate("/");
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => todoapp()}>ToDo App</div>
          <div className="flex items-center">
            {!isloginorregister && (
              <>
                <button onClick={handleProfile} className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium">Profile</button>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
