import React from "react";
import SidebarCard from "./SidebarCard";

function SideBarColumns() {
  return (
    <div className=" p-4">
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder="Add a card"
          className="border border-slate-400 bg-linear-to-r
from-slate-700
to-slate-800 placeholder:pl-2 pl-2 outline-none rounded-md w-full"
        />
        <SidebarCard />
      </div>
    </div>
  );
}

export default SideBarColumns;
