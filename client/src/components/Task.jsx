import { Check, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useDraggable } from "@dnd-kit/core";

function Task({ task, deleteTask, columnId, setEditModal }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <div
      className="bg-slate-700 p-2 mb-2"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2 mb-2">
        <Check className="bg-emerald-300 rounded-full" size={18} />
        <p>{task.title}</p>
      </div>
      <div className="flex justify-between items-center">
        <div
          onClick={(e) => {
            setEditModal({
              show: true,
              task: task,
            });
            e.stopPropagation();
          }}
        >
          <Eye size={18} />
        </div>
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default Task;
