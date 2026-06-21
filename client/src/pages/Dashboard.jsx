import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserDashboard from "../components/UserDashboard";
import Nav from "../components/Nav";

function Dashboard() {
  return (
    <div className="bg-slate-600/40 h-screen px-2 py-2 overflow-hidden">
      <Navbar />
      <div className="flex">
        <div className="flex-1 w-full">
          <Sidebar />
        </div>
        <div className="flex-3 w-full h-screen overflow-hidden bg-slate-300">
          <UserDashboard />
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Dashboard;
