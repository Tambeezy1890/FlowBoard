import { Calendar, Columns3, Inbox, LayoutDashboard } from "lucide-react";
import React from "react";

function Nav() {
  return (
    <div
      className="text-sm text-white fixed
left-1/2
bottom-[calc(100vh-91%)]
-transform
-translate-x-1/2 z-1000 bg-slate-800 p-2 rounded-xl "
    >
      <div className="flex gap-4">
        <div className="bg-blue-700/50 text-cyan-400 flex items-center gap-1 text-sm rounded-2xl p-1">
          <Inbox size={20} strokeWidth={1} />
          Inbox
        </div>
        <div className=" text-white flex items-center gap-1 text-sm rounded-2xl p-1">
          <Calendar size={20} strokeWidth={1} />
          Planner
        </div>
        <div className="bg-blue-700/50 text-cyan-400 flex items-center gap-1 text-sm rounded-2xl p-1">
          <LayoutDashboard size={20} strokeWidth={1} />
          Board
        </div>
        <div className="text-white flex items-center gap-1 text-sm rounded-2xl px-2 text">
          <Columns3 size={20} strokeWidth={1} />
          <p className="text-[12px] text-nowrap">Switch Boards</p>
        </div>
      </div>
    </div>
  );
}

export default Nav;
