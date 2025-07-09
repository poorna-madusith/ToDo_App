import React from "react";

const UserDetails = ({ user }) => {
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
      <p className="text-gray-600"><strong className="font-medium text-gray-800">Username:</strong> {user.username}</p>
      <p className="text-gray-600"><strong className="font-medium text-gray-800">Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;
