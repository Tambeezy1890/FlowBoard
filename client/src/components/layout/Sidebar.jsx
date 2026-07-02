import React from "react";
import SidebarHeader from "./SidebarHeader";
import SideBarColumns from "./SideBarColumns";

function Sidebar() {
  return (
    <div
      className="border bg-linear-to-b
from-blue-700
via-blue-900
to-slate-900 w-full border-slate-400 rounded-2xl overflow-hidden h-[calc(100vh-100px)]"
    >
      <SidebarHeader />
      <SideBarColumns />
    </div>
  );
}

export default Sidebar;
