import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen h-full bg-gray-900 text-white flex flex-col p-4 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-6 text-center">Traffic Data Dashboard</h1>
      <Link
        to="/manage-traffic"
        className="w-full bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded mb-2 text-left"
      >
        Manage Traffic
      </Link>
    </div>
  );
};

export default Sidebar;
