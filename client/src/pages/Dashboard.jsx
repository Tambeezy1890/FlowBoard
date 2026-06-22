import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserDashboard from "../components/UserDashboard";
import Nav from "../components/Nav";

function Dashboard() {
  return (
    <div className="bg-gray-900 h-screen px-4 py-2 overflow-hidden relative">
      <Navbar />
      <div className="flex gap-3">
        <div className="flex-2 md:flex-1 w-full resize-none">
          <Sidebar />
        </div>
        <div className="flex-3 w-full h-screen overflow-hidden bg-slate-900 rounded-2xl shrink">
          <UserDashboard />
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Dashboard;
