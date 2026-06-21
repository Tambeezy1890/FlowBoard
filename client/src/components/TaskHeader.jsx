import { Ellipsis, Eye, Image, X } from "lucide-react";
import React from "react";

function TaskHeader({ title }) {
  return (
    <div className=" flex justify-between text-white items-center mb-2">
      <div>{title}</div>
      <div className="flex gap-4">
        <Image size={20} />
        <Eye size={20} />
        <Ellipsis size={20} />
        <X size={20} />
      </div>
    </div>
  );
}

export default TaskHeader;
