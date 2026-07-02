import { Check, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, columnId, setEditModal, updateTaskStatus }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="bg-slate-700 p-2 mb-2" ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div className="flex gap-2 items-center ">
          <Check
            className={`${task.completed ? "bg-emerald-300" : "bg-slate-400"} rounded-full`}
            onClick={() => updateTaskStatus(columnId, task.id, !task.completed)}
            size={18}
          />
          <div className="max-w-38  overflow-auto scrollbar-none">
            <p className="text-nowrap">{task.title}</p>
          </div>
        </div>

        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cursor-grab mr-2"
        >
          ⠿
        </button>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditModal({
              show: true,
              task,
            });
          }}
        >
          <Eye size={18} />
        </button>

        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default TaskCard;
