import { Ellipsis, Inbox, ListFilter } from "lucide-react";
import React from "react";

function SidebarHeader() {
  return (
    <div className="w-full  p-2 border-b ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Inbox size={20} className="text-white" />
          <h2 className="text-white ml-2">Inbox</h2>
        </div>
        <div className="text-white flex gap-2 items-center">
          <ListFilter size={20} strokeWidth={2} />
          <Ellipsis size={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;
