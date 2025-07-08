import React from "react";

const UserDetails = ({ user }) => {
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user fields as needed */}
    </div>
  );
};

export default UserDetails;
