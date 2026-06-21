import {
  Check,
  CheckSquare,
  Clock,
  Link,
  Paperclip,
  Pin,
  Plus,
  Tag,
} from "lucide-react";
import React from "react";
import Members from "./Members";
import Description from "./Description";

function TaskData({ task }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-emerald-400 flex items-center justify-center rounded-full mr-2">
          <Check size={20} />
        </div>
        <h1 className="text-2xl text-slate-300 ">{task.title}</h1>
      </div>
      <div className="flex gap-3 mt-2 justify-center text-slate-400">
        <div className="flex items-center gap-1 border border-slate-500 px-2 py-1 rounded-sm">
          <Plus size={20} />
          Add
        </div>
        <div className="flex items-center gap-1 border border-slate-500 px-2 py-1 rounded-sm">
          <Tag size={20} />
          Labels
        </div>
        <div className="flex items-center gap-1 border border-slate-500 px-2 py-1 rounded-sm">
          <Clock size={20} />
          Dates
        </div>
        <div className="flex items-center gap-1 border border-slate-500 px-2 py-1 rounded-sm">
          <CheckSquare size={20} />
          Checklist
        </div>
        <div className="flex items-center gap-1 border border-slate-500 px-2 py-1 rounded-sm">
          <Paperclip size={20} />
          Attachment
        </div>
      </div>
      <Members />
      <Description />
      <div></div>
    </div>
  );
}

export default TaskData;
