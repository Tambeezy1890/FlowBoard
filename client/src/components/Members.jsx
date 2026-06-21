import { Plus } from "lucide-react";
import React from "react";

function Members() {
  return (
    <div className="mt-4">
      <h2 className="text-slate-300">Members</h2>
      <div className="mt-2 flex gap-2">
        <div className="w-6 h-6 bg-blue-400 rounded-full "></div>
        <div className="w-6 h-6 bg-transparent border border-slate-400 rounded-full flex items-center justify-center text-slate-400">
          <Plus size={18} />
        </div>
      </div>
    </div>
  );
}

export default Members;
