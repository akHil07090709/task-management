import React from "react";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center w-80">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.displayName || '--'}</h2>
        <p className="text-gray-600">{user.email || '--'}</p>
        <button
          onClick={handleLogout}
          className="cursor-pointer mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
