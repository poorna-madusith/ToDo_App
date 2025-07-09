import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: get user from localStorage (adjust as needed)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <UserDetails user={user} />
    </div>
  );
};

export default Profile;
