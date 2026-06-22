import {
  Check,
  CheckSquare,
  Clock,
  Link,
  Paperclip,
  Pin,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import Members from "./Members";
import Description from "./Description";

function TaskData({
  task,

  title,
  updateTaskDescription,
  columnId,
  updateTitle,
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);
  const handleChange = (e) => {
    setValue(e.target.value);
    updateTitle(columnId, task.id, e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-emerald-400 flex items-center justify-center rounded-full mr-2">
          <Check size={20} />
        </div>
        <div className="" onClick={() => setEditing(true)}>
          {editing ? (
            <input
              autoFocus
              type="text"
              value={value}
              onChange={(e) => handleChange(e)}
            />
          ) : (
            <h1 className="text-2xl text-slate-300 ">{task.title}</h1>
          )}
        </div>
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
      <Description
        task={task}
        columnId={columnId}
        updateTaskDescription={updateTaskDescription}
      />
    </div>
  );
}

export default TaskData;
