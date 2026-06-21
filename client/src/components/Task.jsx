import { Check, Eye } from "lucide-react";
import React from "react";

function Task({ task }) {
  return (
    <div className="bg-slate-700 p-2 mb-2">
      <div className="flex items-center gap-2 mb-2">
        <Check className="bg-emerald-300 rounded-full" size={18} />
        <p>{task.title}</p>
      </div>
      <div className="flex justify-between items-center">
        <Eye size={18} />
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default Task;
