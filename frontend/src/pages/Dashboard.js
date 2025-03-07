import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 h-full transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:w-64 bg-gray-900 text-white`}>
        <Sidebar />
      </div>

      <button
        className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-full z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div className={`flex-1 p-6 transition-all ${isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;