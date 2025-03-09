import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/userStore";

const Header = () => {
  const { user } = useUserStore();
  return (
    <nav className="flex justify-between items-center p-6 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Title */}
        <p className="text-2xl font-bold text-gray-800">Task Manager</p>
      </div>
      <ul className="flex items-center text-sm font-medium">
        <Link to="/planner" className="mr-5 cursor-pointer hover:text-gray-700">
          Planner
        </Link>
        <Link
          to="/activityLog"
          className="mr-5 cursor-pointer hover:text-gray-700"
        >
          Activity Log
        </Link>
        <div>
          {user ? (
            <Link to="/profile" className="ml-4">
              <button className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                Profile
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
